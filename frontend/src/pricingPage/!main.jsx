import Footer from "../footer";
import Header from "../header";
import ChargesSection from "./charges-section";
import HeroSection from "./hero-section";

function PricingPage() {
  return ( 
    <div className="flex flex-col items-center">
      <Header />
      <HeroSection />
      <ChargesSection />
      <Footer />
    </div>
   );
}

export default PricingPage;