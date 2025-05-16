import { Spade } from "lucide-react";
import { ProfileButton } from "../profile/ProfileButton";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Card } from "../ui/card";
import { MenuButton } from "./MenuButton";

export const Header = ({ heading }: { heading: string }) => (
  <Card className="m-2 p-2 pl-4 shadow-md">
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Spade strokeWidth={3} />
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text pr-2">
          {heading}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <ProfileButton />
        <MenuButton />
      </div>
    </div>
  </Card>
);
