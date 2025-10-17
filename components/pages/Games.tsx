"use client";

import { Header } from "@/components/common/Header";
import { useGames } from "@/hooks/useGames";
import { useTranslation } from "@/i18n/client";
import { useState } from "react";
import { GamesGrid } from "../common/GamesGrid";
import Details from "./Details";

export default function Games({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "games");
  const { games, isLoading, favoriteIds, handleToggleFavorite } = useGames();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  if (selectedGameId) {
    return (
      <Details
        lng={lng}
        gameId={selectedGameId}
        onBack={() => setSelectedGameId(null)}
      />
    );
  }

  return (
    <main>
      <Header heading={t("h1")} />
      {/* <div className="flex justify-between items-center pl-2">
        <AddGameButton onGameAdded={fetchGames} />
      </div> */}
      <div className="container mx-auto p-2">
        {isLoading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-70 w-full rounded-lg bg-muted animate-pulse "
                />
              ))}
            </div>
          </>
        ) : (
          <GamesGrid
            games={games}
            isLoading={isLoading}
            favorites={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onGameSelect={setSelectedGameId}
            emptyText="Keine Spiele gefunden."
          />
        )}
      </div>
    </main>
  );
}
