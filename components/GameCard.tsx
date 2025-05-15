import * as React from "react";
import Link from "next/link";
import {
  Users,
  Clock,
  Tags,
  BarChartHorizontal,
  Library,
  ArrowRightIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        "flex flex-col h-full transition-all hover:shadow-lg",
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

      <CardFooter>
        <Button asChild variant="outline" className="w-full" size="sm">
          <Link href={href}>
            Learn more
            <ArrowRightIcon className="ml-1.5 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
