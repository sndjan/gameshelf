import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Game } from "@/types/Game";

export function useFavorites() {
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

  return { favorites, isLoading };
}
