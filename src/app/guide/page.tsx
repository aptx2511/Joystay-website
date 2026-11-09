import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidePage from "@/components/guide/GuidePage";
import { G } from "@/lib/guide-content";
import { getGoogleReviews, writeReviewUrl, GOOGLE_PLACE_ID } from "@/lib/google-reviews";

export const revalidate = 21600; // 6 giờ

export const metadata = {
  title: G.meta.title,
  description: G.meta.description,
};

export default async function Page() {
  const reviews = await getGoogleReviews();
  return (
    <>
      <Navbar />
      <main>
        <GuidePage reviews={reviews} writeUrl={writeReviewUrl()} placeId={GOOGLE_PLACE_ID} />
      </main>
      <Footer />
    </>
  );
}
