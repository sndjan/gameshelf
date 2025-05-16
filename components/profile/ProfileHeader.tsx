"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";

export function ProfileHeader() {
  const { data: session, status } = useSession();

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
          <p className="text-lg font-medium">Not Signed In</p>
          <p className="text-sm text-muted-foreground">
            Sign in to access your game collection
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
      </div>
    </div>
  );
}
