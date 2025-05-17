export interface Game {
  _id: string;
  name: string;
  description: string;
  rules?: string;
  players?: string;
  duration?: string;
  tags?: string[];
  decks?: string;
  difficulty?: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
