import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomDetail from "@/components/rooms/RoomDetail";
import { getRoomBySlug } from "@/lib/sanity-data";
import { roomJsonLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";

// SSR: luôn fetch fresh từ Sanity, không dùng cache tĩnh
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: `${room.name} — Boutique Homestay in District 3, Saigon`,
    description: room.shortDescription,
    alternates: { canonical: `${SITE_URL}/rooms/${room.slug}` },
    openGraph: {
      title: `${room.name} | Joystay Vietnam`,
      description: room.shortDescription,
      url: `${SITE_URL}/rooms/${room.slug}`,
      type: "website",
      ...(room.featuredImage ? { images: [{ url: room.featuredImage }] } : {}),
    },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: roomJsonLd(room) }} />
        <RoomDetail room={room} />
      </main>
      <Footer />
    </>
  );
}
