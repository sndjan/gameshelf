import { GameCard } from "@/components/common/GameCard";
import { Game } from "@/types/Game";
import React from "react";

interface GamesGridProps {
  games: Game[];
  isLoading: boolean;
  onToggleFavorite?: (gameId: string, isFavorite: boolean) => void;
  favorites?: string[];
  onGameSelect?: (gameId: string | null) => void;
  emptyText?: string;
}

export const GamesGrid: React.FC<GamesGridProps> = ({
  games,
  isLoading,
  onToggleFavorite,
  favorites = [],
  emptyText = "Keine Spiele gefunden.",
  onGameSelect,
}) => {
  return (
    <div className="container mx-auto p-2">
      {isLoading ? (
        <div className="text-center text-muted-foreground">Lade Spiele...</div>
      ) : games.length === 0 ? (
        <div className="text-center text-muted-foreground">{emptyText}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
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
              isFavorite={favorites.includes(game._id)}
              onFavoriteChange={
                onToggleFavorite
                  ? (fav) => onToggleFavorite(game._id, fav)
                  : undefined
              }
              onGameSelect={(gameId) =>
                onGameSelect ? onGameSelect(gameId) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
