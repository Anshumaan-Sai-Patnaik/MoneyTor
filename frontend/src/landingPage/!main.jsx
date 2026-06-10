import EducationSection from "./education";
import HeroSection from "./hero-section";
import KiteConnect from "./kite-connect";
import SignUp from "./open-account";
import PricingSection from "./pricing-section";
import ProductsSection from "./products-section";

function LandingPage() {
  return ( 
    <div className="flex flex-col items-center">
      <HeroSection />
      <ProductsSection />
      <KiteConnect />
      <PricingSection />
      <EducationSection />
      <SignUp />
    </div>
   );
}

export default LandingPage;