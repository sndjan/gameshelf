"use client";

import { GameCard } from "@/components/common/GameCard";
import { Header } from "@/components/common/Header";
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

export default function FavoritenPage() {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return;
      setIsLoading(true);
      const res = await fetch("/api/favorites");
      const data = await res.json();
      setFavorites(data.favorites || []);
      setIsLoading(false);
    };
    fetchFavorites();
  }, [session]);

  return (
    <main>
      <Header heading="Favoriten" />
      <div className="container mx-auto p-2">
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            Lade Favoriten...
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Keine Favoriten gefunden.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((game) => (
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
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
