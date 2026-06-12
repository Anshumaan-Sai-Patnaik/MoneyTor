import eduImage from '../assets/images/landingPage/index-education.svg';

function EducationSection() {
  return ( 
    <div className="flex justify-between w-full max-w-[1100px] flex-wrap p-4">
      <div className="flex items-center flex-1 max-w-[432px] min-w-[300px] mr-4"><img src={eduImage} alt="education" className="w-full h-auto" /></div>
      <div className="flex flex-col flex-1 max-w-[528px] min-w-[360px] my-4 ml-4">
        <div className="flex flex-col m-4 max-w-[528px] ml-auto">
          <h1 className='text-xl text-black mb-3'>Free and open market education</h1>
          <p className='text-lg text-gray-600 my-3'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
          <span className="text-blue-600 whitespace-nowrap mb-3 cursor-pointer">Varsity <i class="fa-solid fa-arrow-right text-xs"></i></span>
          <p className='text-lg text-gray-600 my-3'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
          <span className="text-blue-600 whitespace-nowrap cursor-pointer">TradingQ&A <i class="fa-solid fa-arrow-right text-xs"></i></span>
        </div>
      </div>
    </div>
   );
}

export default EducationSection;