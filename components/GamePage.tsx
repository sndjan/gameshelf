"use client";

import { GameCard } from "@/components/common/GameCard";
import { Header } from "@/components/common/Header";
import { AddGameButton } from "@/components/games/AddGameButton";
import { useTranslation } from "@/i18n/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Game {
  _id: string;
  name: string;
  description: string;
  rules?: string;
  players?: string;
  duration?: string;
  tags?: string[];
  decks?: string;
  difficulty?: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function GamePage({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "games");
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/games");
        const data = await response.json();
        setGames(data.games);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return;
      const res = await fetch("/api/favorites");
      const data = await res.json();
      console.log(data);
      setFavoriteIds((data.favorites || []).map((g: { _id: string }) => g._id));
    };
    fetchFavorites();
  }, [session]);

  const handleFavoriteChange = (gameId: string, fav: boolean) => {
    setFavoriteIds((prev) =>
      fav ? [...prev, gameId] : prev.filter((id) => id !== gameId)
    );
  };

  useEffect(() => {
    console.log("Favorite IDs:", favoriteIds);
  }, [favoriteIds]);

  return (
    <main>
      <Header heading={t("h1")} />
      <div className="flex justify-between items-center pl-2">
        <AddGameButton />
      </div>
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-70 w-full rounded-lg bg-muted animate-pulse "
                />
              ))}
            </>
          ) : (
            games.map((game) => (
              <GameCard
                key={game._id}
                _id={game._id}
                name={game.name}
                description={game.description}
                rules={game.rules}
                players={game.players}
                duration={game.duration}
                tags={game.tags}
                decks={game.decks}
                difficulty={game.difficulty}
                user={game.userId}
                isFavorite={favoriteIds.includes(game._id)}
                onFavoriteChange={(fav) => handleFavoriteChange(game._id, fav)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
