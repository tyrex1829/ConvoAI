import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FooterSection from "../components/Footer";
import Features from "@/components/features-2";
import CommunitySection from "@/components/content-6";
import StatsSection from "@/components/stats";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Magenta Nebula Background with Top Glow */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Your Content/Components */}

      <div className="relative max-w-[80%] mx-auto">
        <NavBar />
        <HeroSection />
        <CommunitySection />
        <div id="features">
          <Features />
        </div>
        <div id="stats">
          <StatsSection />
        </div>
        <div id="pricing">
          <Pricing />
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
