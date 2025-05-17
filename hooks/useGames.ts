import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import type { Game } from "@/types/Game";

export function useGames(options?: { uploadedByMe?: boolean }) {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { data: session } = useSession();

  const fetchGames = useCallback(async () => {
    if (!session) return;
    setIsLoading(true);
    const endpoint = options?.uploadedByMe
      ? "/api/games?uploadedByMe=true"
      : "/api/games";
    const res = await fetch(endpoint);
    const data = await res.json();
    setGames(data.games || []);
    setIsLoading(false);
  }, [session, options?.uploadedByMe]);

  const fetchFavorites = useCallback(async () => {
    if (!session) return;
    setIsLoading(true);
    const res = await fetch("/api/favorites");
    const data = await res.json();
    console.log("Fetched favorites:", data.favorites);
    setFavoriteIds(
      Array.isArray(data.favorites)
        ? data.favorites.map((f: { _id: string }) => f._id)
        : []
    );
  }, [session]);

  useEffect(() => {
    fetchGames();
    fetchFavorites();
  }, [fetchGames, fetchFavorites, options?.uploadedByMe]);

  const handleToggleFavorite = async (
    gameId: string,
    isNowFavorite: boolean
  ) => {
    setFavoriteIds((prev) =>
      isNowFavorite ? [...prev, gameId] : prev.filter((id) => id !== gameId)
    );
    await fetch("/api/favorites", {
      method: isNowFavorite ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId }),
    });
  };

  return { games, isLoading, favoriteIds, handleToggleFavorite, fetchGames };
}
