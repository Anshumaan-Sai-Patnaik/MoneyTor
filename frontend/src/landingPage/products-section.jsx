import productsImage from '../assets/images/landingPage/ecosystem.png';

function ProductsSection() {
  return ( 
    <div className="flex flex-wrap items-center m-5 max-w-[1100px]">
      <div className="flex-1">
        <div className="flex flex-col gap-7 mr-2 min-w-[300px]">
          <h1 className="text-2xl my-2 text-black">Trust with confidence</h1>
          <h1 className="text-2xl text-black -mb-5">Customer-first always</h1><p className="text-gray-500 text-[17px]">That's why 1.6+ crore customers trust MoneyTor with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.</p>
          <h1 className="text-2xl text-black -mb-5">No spam or gimmicks</h1><p className="text-gray-500 text-[17px]">No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. <span className="text-blue-600">Our philosophies.</span></p>
          <h1 className="text-2xl text-black -mb-5">The MoneyTor universe</h1><p className="text-gray-500 text-[17px]">Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
          <h1 className="text-2xl text-black -mb-5">Do better with money</h1><p className="text-gray-500 text-[17px]">With initiatives like <span className="text-blue-600">Nudge</span> and <span className="text-blue-600">Kill Switch</span>, we don't just facilitate transactions, but actively help you do better with your money.</p>
        </div>
      </div>
      <div className="flex-1 min-w-[425px]"><img src={productsImage} alt="products" className="w-full h-auto"/></div>
    </div>
   );
}

export default ProductsSection;