import HeroSection from './Hero';
import AboutSection from './About';
import CTASection from './CTA';

type BusinessData = {
  name: string;
  banner_text: string;
  slogan: string;
  tier: string;
  about: string;
};

export default function Landing({ business }: { business: BusinessData }) {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <HeroSection businessName={business.name} slogan={business.slogan} />
      <AboutSection about={business.about} />
      <CTASection />
    </main>
  );
}