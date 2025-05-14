"use client";

import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

export function MenuButton() {
  return (
    <Button variant="outline" size="icon">
      <EllipsisVertical />
    </Button>
  );
}
