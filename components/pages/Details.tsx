"use client";

import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { useGames } from "@/hooks/useGames";
import { ArrowLeft, Clock, Layers, Tag, Target, Users } from "lucide-react";

interface DetailsProps {
  lng: string;
  gameId: string;
  onBack: () => void;
}

export default function Details({ gameId, onBack }: DetailsProps) {
  // const { t } = useTranslation(lng, "games");
  const { games, isLoading } = useGames();

  const game = games.find((g) => g._id === gameId);

  if (isLoading) {
    return (
      <main>
        <Header heading="Lade..." />
        <div className="container mx-auto p-2">
          <div className="h-96 w-full rounded-lg bg-muted animate-pulse" />
        </div>
      </main>
    );
  }

  if (!game) {
    return (
      <main>
        <Header heading="Spiel nicht gefunden" />
        <div className="container mx-auto p-2">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header heading={game.name} />
      <div className="container mx-auto p-4">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>

        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
              <p className="text-muted-foreground">{game.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                <span className="font-medium">Spieler:</span>
                <span>{game.players}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                <span className="font-medium">Dauer:</span>
                <span>{game.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <Target className="h-6 w-6" />
                <span className="font-medium">Schwierigkeit:</span>
                <span>{game.difficulty}</span>
              </div>

              <div className="flex items-center gap-2">
                <Layers className="h-6 w-6" />
                <span className="font-medium">Karten:</span>
                <span>{game.decks}</span>
              </div>
            </div>

            {game.tags && game.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-6 w-6" />
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 bg-secondary text-secondary-foreground rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold text-lg mb-2">Spielregeln</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{game.rules}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
