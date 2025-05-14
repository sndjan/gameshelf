import { ThemeToggle } from "../theme/ThemeToggle";
import { Card } from "../ui/card";

export const Header = ({ heading }: { heading: string }) => (
  <Card className="m-2 p-2 pl-4 shadow-md">
    <div className="w-full flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight bg-clip-text pr-2">
        {heading}
      </h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </div>
  </Card>
);
