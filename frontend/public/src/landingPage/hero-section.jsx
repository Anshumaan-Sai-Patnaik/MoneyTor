import landingImage from '../assets/images/landingPage/landing.svg';

function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-10 m-5 my-15 max-w-[675px]">
      <img src={landingImage} />
      <h1 className='text-2xl text-black font-semibold'>Invest in everything</h1>
      <h2 className='text-[20px] text-black text-center -mt-7'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</h2>
      <div className="btn btn-primary w-[13rem] text-lg bg-sky-500/100 border-sky-500 hover:bg-black font-Bold">Sign up for free</div>
    </div>
  );
}

export default HeroSection;