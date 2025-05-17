import { LoginRequiredDialog } from "@/components/common/LoginRequiredDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  BarChartHorizontal,
  Clock,
  Heart,
  Library,
  Tags,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface GameCardProps {
  name: string;
  description: string;
  user: string;
  rules?: string;
  players?: string;
  duration?: string;
  tags?: string[];
  decks?: string;
  difficulty?: string;
  _id: string;
  isFavorite?: boolean;
  onFavoriteChange?: (fav: boolean) => void;
}

export function GameCard({
  name,
  description,
  user,
  players,
  duration,
  tags,
  decks,
  difficulty,
  _id,
  isFavorite: isFavoriteProp,
  onFavoriteChange,
}: GameCardProps & {
  _id: string;
  isFavorite?: boolean;
  onFavoriteChange?: (fav: boolean) => void;
}) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(isFavoriteProp || false);
  useEffect(() => {
    setIsFavorite(isFavoriteProp || false);
  }, [isFavoriteProp]);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async () => {
    if (!session) {
      setShowLogin(true);
      return;
    }
    setLoading(true);
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const res = await fetch("/api/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: _id }),
      });
      if (res.ok) {
        if (onFavoriteChange) {
          onFavoriteChange(!isFavorite);
        } else {
          setIsFavorite(!isFavorite);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-xs text-muted-foreground">von {user}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex flex-wrap gap-y-2 gap-x-4">
          {players && (
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{players}</span>
            </div>
          )}

          {duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{duration}</span>
            </div>
          )}

          {difficulty && (
            <div className="flex items-center gap-1.5">
              <BarChartHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{difficulty}</span>
            </div>
          )}

          {decks && (
            <div className="flex items-center gap-1.5">
              <Library className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{decks}</span>
            </div>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex items-start gap-2 flex-wrap">
            <Tags className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-muted text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Button asChild variant="outline" className="flex-1" size="sm">
          <Link href={"/"}>
            Erfahre mehr
            <ArrowRightIcon className="ml-1.5 h-3 w-3" />
          </Link>
        </Button>
        <Button
          variant={"outline"}
          size="sm"
          className="px-2"
          onClick={handleFavorite}
          disabled={loading}
          aria-label={
            isFavorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"
          }
        >
          <Heart
            className={`h-4 w-4`}
            fill={isFavorite ? "red" : "none"}
            color={isFavorite ? "red" : "currentColor"}
          />
        </Button>
      </CardFooter>
      <LoginRequiredDialog open={showLogin} onOpenChange={setShowLogin} />
    </Card>
  );
}
