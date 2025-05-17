import { GamesGrid } from "@/components/common/GamesGrid";
import { Header } from "@/components/common/Header";
import { useGames } from "@/hooks/useGames";

export function MyGames() {
  const { games, isLoading, favoriteIds, handleToggleFavorite } = useGames({
    uploadedByMe: true,
  });

  return (
    <main>
      <Header heading="Meine Spiele" />
      <GamesGrid
        games={games}
        isLoading={isLoading}
        favorites={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
        emptyText="Keine Spiele gefunden."
      />
    </main>
  );
}
