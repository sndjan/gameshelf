"use client";

import { UserRound } from "lucide-react";
import { Button } from "../ui/button";

export function ProfileButton() {
  return (
    <Button variant="outline" size="icon">
      <UserRound />
    </Button>
  );
}
