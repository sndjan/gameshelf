"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileMenu } from "./ProfileMenu";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="w-full sm:max-w-md p-0 flex flex-col"
        aria-describedby={undefined}
      >
        <SheetHeader className="border-b p-4">
          <div className="flex justify-between items-center">
            <SheetTitle>Profile</SheetTitle>
            <SheetClose />
          </div>
        </SheetHeader>

        <div className="flex-grow overflow-auto p-4">
          <ProfileHeader />
          <div className="mt-6">
            <ProfileMenu onClose={onClose} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
