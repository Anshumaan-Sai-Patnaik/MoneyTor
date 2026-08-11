import pricingImg from '../assets/images/landingPage/pricing-eq.svg';
import otherTradesImg from '../assets/images/landingPage/other-trades.svg';

function HeroSection() {
  return ( 
    <>
      <div className="flex flex-col items-center gap-4 my-10 mb-15">
        <h1 className="text-black text-2xl font-semibold">Charges</h1>
        <p className="text-gray-500 text-xl">List of all charges and taxes</p>
      </div>
      <div className="flex max-w-[1100px] max-[800px]:flex-col mb-25">
        <div className="flex flex-1 flex-col items-center content-center p-4 gap-5">
          <div className="flex items-center max-w-[250px] max-[800px]:w-[150px]"><img src={pricingImg} alt="pricing" className="w-full h-auto" /></div>
          <h1 className="text-black text-3xl text-center font-semibold">Free equity delivery</h1>
          <p className="text-gray-500 text-lg text-center">All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
        </div>
        <div className="flex flex-1 flex-col items-center content-center p-4 gap-5">
          <div className="flex items-center max-w-[250px] max-[800px]:w-[150px]"><img src={otherTradesImg} alt="pricing" className="w-full h-auto" /></div>
          <h1 className="text-black text-3xl text-center font-semibold">Intraday and F&O trades</h1>
          <p className="text-gray-500 text-lg text-center">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
        </div>
        <div className="flex flex-1 flex-col items-center p-4 gap-5">
          <div className="flex items-center max-w-[250px] max-[800px]:w-[150px]"><img src={pricingImg} alt="pricing" className="w-full h-auto" /></div>
          <h1 className="text-black text-3xl text-center font-semibold">Free direct MF</h1>
          <p className="text-gray-500 text-lg text-center">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
        </div>
      </div>
    </>
  );
}

export default HeroSection;