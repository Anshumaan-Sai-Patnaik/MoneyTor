import kiteImg from '../assets/images/productPage/products-kite.png'
import gPlay from '../assets/images/productPage/google-play-badge.svg'
import aStore from '../assets/images/productPage/appstore-badge.svg'
import consoleImg from '../assets/images/productPage/products-console.png'
import coinImg from '../assets/images/productPage/products-coin.png'
import kiteMbleImg from '../assets/images/productPage/landing.svg'
import varsityImg from '../assets/images/productPage/varsity-products.svg'

function ProductsSection() {
  return ( 
    <div className="flex w-full max-w-[1100px] gap-10 flex-col mx-4 p-6">
      <div className="flex items-center w-full justify-between max-[800px]:flex-col gap-7 my-10">
        <div className="flex items-center justify-center min-[800px]:min-w-[425px]"><img src={kiteImg} alt="kite" className="w-full h-auto"/></div>
        <div className="flex flex-col min-[800px]:max-w-[345px]">
          <h1 className="text-black text-2xl font-semibold mt-5 mb-2">Kite</h1>
          <p className="text-black text-lg my-2">Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.</p>
          <div className="flex max-[800px]:flex-col">
            <span className="text-blue-600 text-lg my-1 min-[800px]:mr-4 whitespace-nowrap cursor-pointer">Try demo <i class="fa-solid fa-arrow-right text-xs"></i></span>
            <span className="text-blue-600 text-lg my-1 max-[800px]:-mt-1 whitespace-nowrap cursor-pointer">Learn more <i class="fa-solid fa-arrow-right text-xs"></i></span>
          </div>
          <div className="flex flex-wrap mt-3 gap-4">
            <div className="flex cursor-pointer"><img src={gPlay} alt="googleplay" /></div>
            <div className="flex cursor-pointer"><img src={aStore} alt="appStore" /></div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-row-reverse w-full justify-between max-[800px]:flex-col gap-7 my-10">
        <div className="flex items-center justify-center min-[800px]:min-w-[425px]"><img src={consoleImg} alt="kite" className="max-w-[623px] w-full h-auto"/></div>
        <div className="flex flex-col min-[800px]max-w-[345px]">
          <h1 className="text-black text-2xl font-semibold mt-5 mb-2">Console</h1>
          <p className="text-black text-lg my-2">The central dashboard for your MoneyTor account. Gain insights into your trades and investments with in-depth reports and visualisations.</p>
          <div className="flex max-[800px]:flex-col">
            <span className="text-blue-600 text-lg my-1 min-[800px]:mr-4 whitespace-nowrap cursor-pointer">Learn more <i class="fa-solid fa-arrow-right text-xs"></i></span>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full justify-between max-[800px]:flex-col gap-7 my-10">
        <div className="flex items-center justify-center min-[800px]:min-w-[425px]"><img src={coinImg} alt="kite" className="w-full h-auto"/></div>
        <div className="flex flex-col min-[800px]max-w-[345px]">
          <h1 className="text-black text-2xl font-semibold mt-5 mb-2">Coin</h1>
          <p className="text-black text-lg my-2">Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.</p>
          <div className="flex max-[800px]:flex-col">
            <span className="text-blue-600 text-lg my-1 min-[800px]:mr-4 whitespace-nowrap cursor-pointer">Coin <i class="fa-solid fa-arrow-right text-xs"></i></span>
          </div>
          <div className="flex flex-wrap mt-3 gap-4">
            <div className="flex cursor-pointer"><img src={gPlay} alt="googleplay" /></div>
            <div className="flex cursor-pointer"><img src={aStore} alt="appStore" /></div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-row-reverse w-full justify-between max-[800px]:flex-col gap-7 my-10">
        <div className="flex items-center justify-center min-[800px]:min-w-[425px]"><img src={kiteMbleImg} alt="kite" className="w-full h-auto"/></div>
        <div className="flex flex-col min-[800px]max-w-[345px]">
          <h1 className="text-black text-2xl font-semibold mt-5 mb-2">Kite Connect API</h1>
          <p className="text-black text-lg my-2">Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase.</p>
          <div className="flex max-[800px]:flex-col">
            <span className="text-blue-600 text-lg my-1 min-[800px]:mr-4 whitespace-nowrap cursor-pointer">Kite Connect <i class="fa-solid fa-arrow-right text-xs"></i></span>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full justify-between max-[800px]:flex-col gap-7 my-10">
        <div className="flex items-center justify-center min-[800px]:min-w-[425px]"><img src={varsityImg} alt="kite" className="w-fullmax-w-[310px] h-auto"/></div>
        <div className="flex flex-col min-[800px]max-w-[345px]">
          <h1 className="text-black text-2xl font-semibold mt-5 mb-2">Varsity mobile</h1>
          <p className="text-black text-lg my-2">An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go.</p>
          <div className="flex flex-wrap mt-3 gap-4">
            <div className="flex cursor-pointer"><img src={gPlay} alt="googleplay" /></div>
            <div className="flex cursor-pointer"><img src={aStore} alt="appStore" /></div>
          </div>
        </div>
      </div>
    </div>
   );
}

export default ProductsSection;