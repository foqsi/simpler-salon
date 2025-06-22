import HeroSection from "./Hero";
import FeaturesSection from "./Features";
import ComparisonSection from "./Comparison";
import CTASection from "./CTA";

export default function LandingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ComparisonSection />
      <CTASection />
    </div>
  );
}