import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Joystay Vietnam — The Art of Stay",
    template: "%s | Joystay Vietnam",
  },
  description:
    "Boutique Homestay & Serviced Apartments in District 1, Ho Chi Minh City. 5 uniquely designed rooms. Self check-in 24/7. Book direct for the best rate.",
  keywords: ["boutique homestay", "District 1", "Ho Chi Minh City", "Saigon", "serviced apartment", "self checkin"],
  openGraph: {
    title: "Joystay Vietnam — The Art of Stay",
    description: "5 artistically designed rooms in the heart of District 1, Saigon.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
