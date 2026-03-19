import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomsListing from "@/components/rooms/RoomsListing";

export const metadata = {
  title: "Our Rooms",
  description: "5 artistically designed rooms in the heart of District 1, Saigon. Choose your concept.",
};

export default function RoomsPage() {
  return (
    <>
      <Navbar />
      <main>
        <RoomsListing />
      </main>
      <Footer />
    </>
  );
}
