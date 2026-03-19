import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomDetail from "@/components/rooms/RoomDetail";
import { ROOMS } from "@/lib/mock-data";

export async function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.shortDescription,
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) notFound();

  return (
    <>
      <Navbar />
      <main>
        <RoomDetail room={room} />
      </main>
      <Footer />
    </>
  );
}
