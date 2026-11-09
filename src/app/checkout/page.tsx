import { notFound } from "next/navigation";
import { getRoomBySlug, getSiteSettings } from "@/lib/sanity-data";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ room?: string; checkIn?: string; checkOut?: string; guests?: string }>;
}

export const metadata: Metadata = {
  title: "Book a Room — Joystay Vietnam",
  description: "Complete your booking at Joystay Vietnam boutique homestay, District 3, Ho Chi Minh City.",
};

export default async function CheckoutPage({ searchParams }: Props) {
  const { room: slug, checkIn, checkOut, guests } = await searchParams;

  if (!slug) notFound();

  const [room, settings] = await Promise.all([
    getRoomBySlug(slug),
    getSiteSettings(),
  ]);

  if (!room || !room.isAvailable) notFound();

  return (
    <CheckoutFlow
      room={room}
      settings={settings}
      initialCheckIn={checkIn}
      initialCheckOut={checkOut}
      initialGuests={guests ? parseInt(guests, 10) : 1}
    />
  );
}
