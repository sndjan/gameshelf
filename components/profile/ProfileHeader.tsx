"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function ProfileHeader() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<{
    uploadedCount: number;
    favoritesCount: number;
  } | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    if (!session) return;
    setStatsLoading(true);
    fetch("/api/profile-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .finally(() => setStatsLoading(false));
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center">
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
        <div className="space-y-2 text-center">
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <UserRound size={48} />
          </div>
        </div>
        <div className="space-y-1 text-center">
          <p className="text-lg font-medium">Nicht angemeldet</p>
          <p className="text-sm text-muted-foreground">
            Du bist nicht angemeldet. Bitte melde dich an, um dein Profil zu
            sehen.
          </p>
        </div>
      </div>
    );
  }

  const userInitials = session.user?.name
    ? session.user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-center">
        <Avatar className="h-24 w-24">
          {session.user?.image ? (
            <AvatarImage
              src={session.user.image}
              alt={session.user.name || "User"}
            />
          ) : (
            <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
          )}
        </Avatar>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-lg font-medium">{session.user?.name}</p>
        <p className="text-sm text-muted-foreground">{session.user?.email}</p>
        {statsLoading ? (
          <div className="flex flex-col items-center mt-2">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : (
          stats && (
            <div className="flex flex-col items-center mt-2 text-xs text-muted-foreground gap-1">
              <span>
                Hochgeladene Spiele: <b>{stats.uploadedCount}</b>
              </span>
              <span>
                Favoriten: <b>{stats.favoritesCount}</b>
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
