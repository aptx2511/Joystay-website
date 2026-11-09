import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AvailabilityHero from "@/components/availability/AvailabilityHero";
import AvailabilityBoard from "@/components/availability/AvailabilityBoard";
import { getRooms } from "@/lib/sanity-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Availability",
  description: "See which dates are free at Joystay, District 3 — nightly prices for every room, book direct in one tap.",
};

export default async function AvailabilityPage() {
  const rooms = await getRooms();
  return (
    <>
      <Navbar />
      <main>
        <AvailabilityHero />
        <section className="bg-joy-cream px-3 sm:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <AvailabilityBoard rooms={rooms} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
