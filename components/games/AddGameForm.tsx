import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddGameFormProps {
  onSuccess?: () => void;
}

export function AddGameForm({ onSuccess }: AddGameFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rules: "",
    players: "",
    duration: "",
    tags: "",
    decks: "",
    difficulty: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      return;
    }

    try {
      setIsLoading(true);

      // Convert comma-separated tags to array
      const processedData = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
      };

      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add game");
      }

      setFormData({
        name: "",
        description: "",
        rules: "",
        players: "",
        duration: "",
        tags: "",
        decks: "",
        difficulty: "",
        imageUrl: "",
      });
      router.refresh();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Please sign in to add a game to your collection
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/login")}>Sign In</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Game</CardTitle>
        <CardDescription>
          Fill out the form below to add a new game to your collection
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Game Details</TabsTrigger>
        </TabsList>
        <form onSubmit={handleSubmit}>
          <TabsContent value="basic">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Game name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Game description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="details">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="players">Players</Label>
                <Input
                  id="players"
                  name="players"
                  placeholder="1-4 players"
                  value={formData.players}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="30-45 minutes"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Input
                  id="difficulty"
                  name="difficulty"
                  placeholder="Easy, Medium, Hard"
                  value={formData.difficulty}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Strategy, Family, Card Game (comma separated)"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decks">Decks/Components</Label>
                <Input
                  id="decks"
                  name="decks"
                  placeholder="2 decks, 4 player boards"
                  value={formData.decks}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rules">Rules Summary</Label>
                <Textarea
                  id="rules"
                  name="rules"
                  placeholder="Brief rules overview"
                  rows={3}
                  value={formData.rules}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </TabsContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Game"}
            </Button>
          </CardFooter>
        </form>
      </Tabs>
    </Card>
  );
}
