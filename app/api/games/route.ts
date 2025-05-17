import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import { Game } from "@/models/Game";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const uploadedByMe = url.searchParams.get("uploadedByMe");
    let games;
    if (uploadedByMe) {
      const session = await getServerSession(authOptions);
      // @ts-expect-error: id is injected by our NextAuth callback
      if (!session || !session.user?.id) {
        return NextResponse.json(
          { error: "Nicht authentifiziert" },
          { status: 401 }
        );
      }
      // @ts-expect-error: id is injected by our NextAuth callback
      const user = await User.findById(session.user.id);
      const gameIds = user.get("games") || [];
      games = await Game.find({ _id: { $in: gameIds } }).sort({
        createdAt: -1,
      });
    } else {
      games = await Game.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({ games }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch games";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-expect-error: id is injected by our NextAuth callback
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const data = await request.json();
    await dbConnect();
    // @ts-expect-error: id is injected by our NextAuth callback
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const game = await Game.create({
      ...data,
      userId: user._id,
    });
    await User.updateOne({ _id: user._id }, [
      {
        $set: {
          games: {
            $cond: [
              { $not: ["$games"] },
              [game._id],
              { $concatArrays: ["$games", [game._id]] },
            ],
          },
        },
      },
    ]);
    return NextResponse.json({ game }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add game";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
