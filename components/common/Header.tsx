import { Home, Spade } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const Header = ({ heading }: { heading: string }) => (
  <Card className="m-4 p-2 pl-4 shadow-md sticky top-4 z-10 bg-background">
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Spade className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text pr-2">
          {heading}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <Home className="h-6 w-6" />
        </Button>
        {/* <ProfileButton /> */}
        {/* <MenuButton /> */}
      </div>
    </div>
  </Card>
);
