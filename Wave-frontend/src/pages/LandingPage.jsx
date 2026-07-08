import NavbarLandingPage from "../components/Landing Page/NavbarLandingPage";
import Hero from "../components/Landing Page/Hero";
import FooterLandingPage from "../components/Landing Page/FooterLandingPage";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-[#030712] text-white">
      <NavbarLandingPage />
      <Hero />
      <FooterLandingPage/>

    </div>
  );
}