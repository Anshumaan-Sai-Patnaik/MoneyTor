import Footer from "../footer";
import Header from "../header";
import HeroSection from "./hero-section";
import People from "./people-section";

function AboutPage() {
  return ( 
    <div className="flex flex-col items-center">
      <Header />
      <HeroSection />
      <People />
      <Footer />
    </div>
   );
}

export default AboutPage;