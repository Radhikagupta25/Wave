import NavbarLandingPage from "../components/Landing Page/NavbarLandingPage";
import Hero from "../components/Landing Page/Hero";
import FooterLandingPage from "../components/Landing Page/FooterLandingPage";
import CursorTrail from "../components/Landing Page/CursorTrail";
import Features from "../components/Landing Page/Features";
import HowItWorks from "../components/Landing Page/HowItWorks";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-[#030712] text-white">
      <CursorTrail />
      <NavbarLandingPage />
      <Hero />
      <Features />
      <HowItWorks />
      <FooterLandingPage />
    </div>
  );
}