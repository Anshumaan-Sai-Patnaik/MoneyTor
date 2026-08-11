import Footer from "../footer";
import Header from "../header";
import HeroSection from "./hero-section";
import Links from "./links";

function SupportPage() {
  return ( 
    <div className="flex flex-col items-center">
      <Header />
      <HeroSection />
      <Links />
      <Footer />
    </div>
   );
}

export default SupportPage;