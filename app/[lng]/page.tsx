import GamePage from "@/components/GamePage";

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return <GamePage lng={lng} />;
}
