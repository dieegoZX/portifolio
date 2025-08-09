import { AppHeader } from '@/components/common/header';
import { AppFooter } from '@/components/common/footer';
import { HeroSection } from '@/components/sections/hero';
import { PortfolioSection } from '@/components/sections/portfolio';
import { LandingPagesSection } from '@/components/sections/landing-pages';
import { TrafficManagementSection } from '@/components/sections/traffic-management';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <HeroSection />
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
