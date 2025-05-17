import { GamesGrid } from "@/components/common/GamesGrid";
import { Header } from "@/components/common/Header";
import { useFavorites } from "@/hooks/useFavorites";

export function Favorites() {
  const { favorites, isLoading } = useFavorites();

  return (
    <main>
      <Header heading="Favoriten" />
      <GamesGrid
        games={favorites}
        isLoading={isLoading}
        favorites={favorites.map((g) => g._id)}
        onToggleFavorite={undefined}
        emptyText="Keine Favoriten gefunden."
      />
    </main>
  );
}
