import Footer from "../footer";
import Header from "../header";
import HeroSection from "./hero-section";
import ProductsSection from "./products-section";

function ProductPage() {
  return ( 
    <div className="flex flex-col items-center">
      <Header />
      <HeroSection />
      <ProductsSection />
      <Footer />
    </div>
   );
}

export default ProductPage;