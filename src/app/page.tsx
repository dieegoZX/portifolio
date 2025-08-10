import { AppHeader } from '@/components/common/header';
import { AppFooter } from '@/components/common/footer';
import LetterGlitch from '@/components/common/letter-glitch';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { PortfolioSection } from '@/components/sections/portfolio';
import { LandingPagesSection } from '@/components/sections/landing-pages';
import { TrafficManagementSection } from '@/components/sections/traffic-management';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-0 -z-10">
        <LetterGlitch outerVignette={false} />
      </div>
      <AppHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <LandingPagesSection />
        <TrafficManagementSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <AppFooter />
    </div>
  );
}
