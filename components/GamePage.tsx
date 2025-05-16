"use client";

import { GameCard } from "@/components/common/GameCard";
import { Header } from "@/components/common/Header";
import { AddGameButton } from "@/components/games/AddGameButton";
import { useTranslation } from "@/i18n/client";
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

  return (
    <main>
      <Header heading={t("h1")} />
      <div className="flex justify-between items-center pl-2">
        <AddGameButton />
      </div>
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 w-64 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            games.map((game) => (
              <GameCard
                key={game._id}
                name={game.name}
                description={game.description}
                href={""}
                rules={game.rules}
                players={game.players}
                duration={game.duration}
                tags={game.tags}
                decks={game.decks}
                difficulty={game.difficulty}
                user={game.userId}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
