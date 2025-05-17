import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    // @ts-expect-error: id is injected by our NextAuth callback
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert" },
        { status: 401 }
      );
    }
    await dbConnect();
    // @ts-expect-error: id is injected by our NextAuth callback
    const user = await User.findById(session.user.id);
    const uploadedCount = user?.get("games")?.length || 0;
    const favoritesCount = user?.get("favorites")?.length || 0;
    return NextResponse.json(
      { uploadedCount, favoritesCount },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Fehler beim Laden der Statistik";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
