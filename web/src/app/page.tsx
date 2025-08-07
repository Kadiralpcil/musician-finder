// app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import FeaturedMusicians from "@/components/home/FeaturedMusicians";
import SearchPreview from "@/components/home/SearchPreview";
import StatsSection from "@/components/home/StatsSection";
import CTAFooter from "@/components/home/CTAFooter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedMusicians />
      <SearchPreview />
      <StatsSection />
      <CTAFooter />
    </main>
  );
}

export const metadata = {
  title: "Musician Finder - Find Your Perfect Musical Match",
  description:
    "Connect with musicians in your area, form bands, collaborate on projects. Join thousands of musicians finding their perfect match.",
  openGraph: {
    title: "Musician Finder - Find Your Perfect Musical Match",
    description:
      "Connect with musicians in your area, form bands, collaborate on projects.",
  },
};
