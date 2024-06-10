import Trending from "@/components/home/Trending";

export default function Home() {
  return (
    <main className="px-3 pt-20 md:pt-32">
      <h2 className="mb-3 text-lg font-medium">Everyone&apos;s Watching...</h2>
      <Trending />
    </main>
  );
}
