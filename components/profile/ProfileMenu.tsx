"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookMarked, Heart, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

interface ProfileMenuProps {
  onClose: () => void;
}

export function ProfileMenu({ onClose }: ProfileMenuProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="space-y-4">
        <Separator />
        <div className="space-y-2">
          <Button
            asChild
            variant="default"
            className="w-full justify-start"
            onClick={onClose}
          >
            <Link href="/api/auth/signin">
              <LogIn className="mr-2 h-4 w-4" />
              Anmelden
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Separator />
      <div className="space-y-1">
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
          onClick={onClose}
        >
          <Link href="/">
            <Heart className="mr-2 h-4 w-4" />
            Favoriten
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
          onClick={onClose}
        >
          <Link href="/">
            <BookMarked className="mr-2 h-4 w-4" />
            Meine Spiele
          </Link>
        </Button>
      </div>
      <Separator />
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
