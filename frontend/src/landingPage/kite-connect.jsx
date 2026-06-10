import kcLogo from '../assets/images/landingPage/kc-logo-landing.svg';
import kcBanner from '../assets/images/landingPage/kc-banner-image.svg';

function KiteConnect() {
  return ( 
    <div className="flex flex-wrap flex-col min-[800px]:flex-row max-w-[1100px] items-center bg-blue-50 py-6 my-15">
      <div className="flex flex-center min-[800px]:justify-center"><img src={kcLogo} alt="kcLogo" className='mr-7 ' /></div>
      <div className=' flex-1 p-2 m-2 max-w-[650px]'><p className='text-gray-600 text-sm'>Need more? Build your own trading and investing experience with Kite Connect, simple HTTP APIs to place orders, stream market data, manage your account, and more. <span className="text-blue-600 whitespace-nowrap">Explore <i class="fa-solid fa-arrow-right text-xs"></i></span></p></div>
      <div className="flex flex-center w-[175px] max-[799px]:hidden"><img src={kcBanner} alt="kcBanner" className="w-full h-auto" /></div>
    </div>
  );
}

export default KiteConnect;