import { languages, fallbackLng } from "../../i18n/settings";
import { useTranslation } from "../../i18n";
import { Header } from "../../components/Header/Header";
import { GameCard } from "@/components/GameCard";

const games = [
  {
    name: "Durak",
    description:
      "A strategic Russian shedding game where players try not to be the last one with cards.",
    href: "/durak",
    rules:
      "Players attack and defend using trump suits. The last player with cards is the 'Durak' (fool).",
    players: "2–6",
    duration: "20–40 minutes",
    tags: ["strategic", "classic", "Russian", "trump-based"],
    decks: "1 standard deck (36 cards: remove 2–5s)",
    difficulty: "medium",
  },
  {
    name: "Shithead",
    description:
      "A fast-paced game popular among backpackers, known for quirky rules and big reversals.",
    href: "/shithead",
    rules:
      "Players take turns playing higher cards or special effect cards. Last out wins.",
    players: "3–5",
    duration: "15–30 minutes",
    tags: ["fun", "chaotic", "unpredictable"],
    decks: "1 standard deck",
    difficulty: "easy",
  },
  {
    name: "President",
    description:
      "A hierarchy-based game where players try to become the President by getting rid of their cards first.",
    href: "/president",
    rules:
      "Players play higher cards to beat others; round order determines roles for next round.",
    players: "4–7",
    duration: "20–30 minutes",
    tags: ["social", "party", "ranking"],
    decks: "1 standard deck (add another for 6+ players)",
    difficulty: "easy",
  },
  {
    name: "Spades",
    description:
      "A trick-taking partnership game where players bid the number of tricks they'll win.",
    href: "/spades",
    rules:
      "Players must follow suit. Spades are trump. Points are gained for correct bids.",
    players: "4",
    duration: "45–60 minutes",
    tags: ["competitive", "strategic", "team-based"],
    decks: "1 standard deck",
    difficulty: "medium",
  },
  {
    name: "Hearts",
    description:
      "Avoid winning tricks with hearts or the queen of spades. Lowest score wins.",
    href: "/hearts",
    rules:
      "Players pass cards, then try to avoid penalty cards during trick-taking.",
    players: "4",
    duration: "30–60 minutes",
    tags: ["classic", "strategic", "penalty-based"],
    decks: "1 standard deck",
    difficulty: "medium",
  },
  {
    name: "Mau Mau",
    description:
      "A shedding game similar to Uno but played with a traditional deck.",
    href: "/mau-mau",
    rules:
      "Play matching value/suit cards. Certain cards have effects (e.g. skip, reverse).",
    players: "2–5",
    duration: "10–20 minutes",
    tags: ["fast-paced", "easy", "family"],
    decks: "1 standard deck",
    difficulty: "easy",
  },
  {
    name: "Euchre",
    description: "A trick-taking game with partners and a unique 24-card deck.",
    href: "/euchre",
    rules: "Players aim to win at least 3 of 5 tricks using trump cards.",
    players: "4",
    duration: "20–30 minutes",
    tags: ["team-based", "classic", "Midwestern"],
    decks: "1 modified deck (24 cards: 9–A only)",
    difficulty: "medium",
  },
  {
    name: "Rummy",
    description:
      "Form sets or runs of cards to score points. Multiple variants exist.",
    href: "/rummy",
    rules: "Draw/discard each turn, collect melds to reduce hand value.",
    players: "2–6",
    duration: "30–60 minutes",
    tags: ["strategic", "classic", "family"],
    decks: "1–2 standard decks depending on players",
    difficulty: "medium",
  },
  {
    name: "Exploding Kittens",
    description:
      "A modern, humorous elimination game involving defusing kittens.",
    href: "/exploding-kittens",
    rules:
      "Draw until someone draws an exploding kitten unless defused. Last standing wins.",
    players: "2–5 (expandable)",
    duration: "10–20 minutes",
    tags: ["fun", "silly", "party"],
    decks: "Custom Exploding Kittens deck",
    difficulty: "very easy",
  },
  {
    name: "Poker (Texas Hold'em)",
    description:
      "The most popular poker variant. Bet strategically to win the pot.",
    href: "/poker-texas-holdem",
    rules:
      "Players use two hole cards and five community cards to form the best hand.",
    players: "2–10",
    duration: "30–90 minutes",
    tags: ["strategic", "competitive", "bluffing"],
    decks: "1 standard deck",
    difficulty: "medium to hard",
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  let { lng } = await params;
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);

  return (
    <>
      <main>
        <Header heading={t("h1")} />

        <div className="container mx-auto p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.name}
                name={game.name}
                description={game.description}
                href={game.href}
                rules={game.rules}
                players={game.players}
                duration={game.duration}
                tags={game.tags}
                decks={game.decks}
                difficulty={game.difficulty}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
