import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Nicht authentifiziert" },
        { status: 401 }
      );
    }
    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).populate(
      "favorites"
    );
    if (!user) {
      return NextResponse.json({ favorites: [] }, { status: 200 });
    }
    return NextResponse.json({ favorites: user.favorites }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Fehler beim Laden der Favoriten";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Nicht authentifiziert" },
        { status: 401 }
      );
    }
    const { gameId } = await request.json();
    await dbConnect();
    let user = await User.findOne({ email: session.user.email });
    if (!user) {
      user = await User.create({ email: session.user.email, favorites: [] });
    }
    if (!user.favorites.includes(gameId)) {
      user.favorites.push(gameId);
      await user.save();
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Fehler beim Hinzufügen zu Favoriten";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Nicht authentifiziert" },
        { status: 401 }
      );
    }
    const { gameId } = await request.json();
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (user && user.favorites.includes(gameId)) {
      user.favorites = user.favorites.filter(
        (id: string) => id.toString() !== gameId
      );
      await user.save();
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Fehler beim Entfernen aus Favoriten";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
