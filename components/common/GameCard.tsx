import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  BarChartHorizontal,
  Clock,
  Heart,
  Library,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";

interface GameCardProps {
  name: string;
  description: string;
  href: string;
  user: string;
  rules?: string;
  players?: string;
  duration?: string;
  tags?: string[];
  decks?: string;
  difficulty?: string;
  className?: string;
}

export function GameCard({
  name,
  description,
  href,
  user,
  players,
  duration,
  tags,
  decks,
  difficulty,
  className,
}: GameCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-all hover:shadow-md",
        className
      )}
    >
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
        <Button
          asChild
          variant="outline"
          className="flex-1"
          size="sm"
          onClick={() => {
            window.alert("Feature not implemented yet");
          }}
        >
          <Link href={href}>
            Erfahre mehr
            <ArrowRightIcon className="ml-1.5 h-3 w-3" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="px-2"
          onClick={() => {
            window.alert("Feature not implemented yet");
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
