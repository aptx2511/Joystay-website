import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/contact/ContactSection";

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Us",
  description: "Get in touch with Joystay Vietnam. Chat on Zalo, Messenger, or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
