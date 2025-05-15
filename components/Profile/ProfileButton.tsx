"use client";

import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileSidebar } from "./ProfileSidebar";

export function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open profile"
      >
        <UserRound className="h-5 w-5" />
      </Button>
      <ProfileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
