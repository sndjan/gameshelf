"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Settings,
  BookMarked,
  Heart,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
              Sign In
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full justify-start"
            onClick={onClose}
          >
            <Link href="/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
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
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          My Games
        </h3>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
          onClick={onClose}
        >
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
          onClick={onClose}
        >
          <Link href="/favorites">
            <Heart className="mr-2 h-4 w-4" />
            Favorites
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
          onClick={onClose}
        >
          <Link href="/collections">
            <BookMarked className="mr-2 h-4 w-4" />
            My Collections
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Settings
        </h3>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
          onClick={onClose}
        >
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Link>
        </Button>
      </div>

      <Separator />

      <div>
        <LogoutButton className="w-full" />
      </div>
    </div>
  );
}
