import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomDetail from "@/components/rooms/RoomDetail";
import { getRoomBySlug } from "@/lib/sanity-data";

// SSR: luôn fetch fresh từ Sanity, không dùng cache tĩnh
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.shortDescription,
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
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
