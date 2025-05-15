"use client";

import { Header } from "../../components/Header/Header";
import { GameCard } from "@/components/GameCard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AddGameButton } from "@/components/AddGameButton";
import { useTranslation } from "@/i18n/client";

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

export default function Page({ params }: { params: { lng: string } }) {
  const { lng } = params;
  const { t } = useTranslation(lng, "games");
  const { data: session } = useSession();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/games");
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
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
    <>
      <main>
        <Header heading={t("h1")} />
        {session && <AddGameButton />}
        <div className="container mx-auto p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 rounded-lg bg-muted animate-pulse"
                  ></div>
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
    </>
  );
}
