import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomsListing from "@/components/rooms/RoomsListing";
import { getRooms } from "@/lib/sanity-data";

export const dynamic = "force-dynamic";

export const metadata = {
  alternates: { canonical: "/rooms" },
  title: "Our Rooms",
  description: "6 artistically designed rooms in the heart of District 3, Saigon. Choose your concept.",
};

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <>
      <Navbar />
      <main>
        <RoomsListing rooms={rooms} />
      </main>
      <Footer />
    </>
  );
}
