import GamePage from "@/components/GamePage";

export default async function Page({ params }: { params: { lng: string } }) {
  const { lng } = await params;
  return <GamePage lng={lng} />;
}
