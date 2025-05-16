"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      className={"w-full justify-start"}
      onClick={handleLogout}
      disabled={isLoading}
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
