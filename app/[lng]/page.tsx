import Games from "@/components/pages/Games";

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return <Games lng={lng} />;
}
