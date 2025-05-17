import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        setTimeout(() => {
          onSuccess();
        }, 100);
      }
    } catch (error) {
      console.error("Error adding game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name*</Label>
        <Input
          id="name"
          name="name"
          placeholder="Name des Spiels"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Beschreibung*</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Beschreibung des Spiels"
          required
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rules">Regeln*</Label>
        <Textarea
          id="rules"
          name="rules"
          placeholder="Spielregeln"
          required
          rows={3}
          value={formData.rules}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="players">Spieler*</Label>
          <Input
            id="players"
            name="players"
            placeholder="1-4 Spieler"
            required
            value={formData.players}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Dauer*</Label>
          <Input
            id="duration"
            name="duration"
            placeholder="30-45 Minuten"
            required
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Schwierigkeit*</Label>
          <Input
            id="difficulty"
            name="difficulty"
            placeholder="Leicht, Mittel, Schwer"
            required
            value={formData.difficulty}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="decks">Decks*</Label>
          <Input
            id="decks"
            name="decks"
            placeholder="1 Skat Deck"
            required
            value={formData.decks}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="Strategie, Spannend, Familienfreundlich (kommagetrennt)"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Adding..." : "Add Game"}
      </Button>
    </form>
  );
}
