import pricingImg from '../assets/images/landingPage/pricing-eq.svg';
import otherTradesImg from '../assets/images/landingPage/other-trades.svg';

function PricingSection() {
  return ( 
    <>
      <div className="flex flex-col p-4">
        <div className="flex flex-col min-[1100px]:flex-row max-w-[1100px] flex-center">
          <div className='min-[1100px]:max-w-[450px]'>
            <h1 className='text-xl text-black mb-4'>Unbeatable pricing</h1>
            <p className='text-lg text-gray-600'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
          </div>
          <div className='flex flex-wrap my-4'>
            <div className='flex'>
              <div className="flex items-center w-[120px]"><img src={pricingImg} alt="pricing" className="w-full h-auto" /></div>
              <div className="flex w-[60px] items-center"><p className='text-black text-xs'>Free account opening</p></div>
            </div>
            <div className='flex'>
              <div className="flex items-center w-[120px]"><img src={pricingImg} alt="pricing" className="w-full h-auto" /></div>
              <div className="flex w-[112px] items-center"><p className='text-black text-xs'>Free equity delivery and direct mutual funds</p></div>
            </div>
            <div className='flex'>
              <div className="flex items-center w-[120px]"><img src={otherTradesImg} alt="trading" className="w-full h-auto" /></div>
              <div className="flex w-[62px] items-center"><p className='text-black text-xs'>Intraday and F&O</p></div>
            </div>
          </div>
        </div>
        <span className="text-blue-600 whitespace-nowrap">See pricing <i class="fa-solid fa-arrow-right text-xs"></i></span>
      </div>
    </>
   );
}

export default PricingSection;