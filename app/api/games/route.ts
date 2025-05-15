import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Game } from "@/models/Game";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const games = await Game.find({}).sort({ createdAt: -1 });

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

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await request.json();
    await dbConnect();

    const game = await Game.create({
      ...data,
      userId: session.user.name,
    });

    return NextResponse.json({ game }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add game";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
