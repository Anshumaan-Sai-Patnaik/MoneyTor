import profileImg from '../assets/images/aboutPage/people-ceo.jpeg';

function People() {
  return ( 
    <>
      <p className='text-black text-2xl font-semibold mb-5'>People</p>
      <div className="flex justify-between flex-wrap p-4 max-w-[900px]">
        <div className='flex-1 flex flex-col mx-4'>
          <div className='flex flex-col items-center px-4'>
            <img src={profileImg} alt="profile" className="w-full max-w-[430px] min-w-[329px] h-auto rounded-full object-cover" /></div>
          <div className='text-center'>
            <p className='text-black my-3'>Anshumaan Sai</p>
            <p className='text-gray-500 my-3'>Founder, CEO</p>
          </div>
        </div>
        <div className="text-black flex-1 flex flex-col min-w-[361px] mx-4 mt-5">
          <p>Anshumaan bootstrapped and founded MoneyTor in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, MoneyTor has changed the landscape of the Indian broking industry.</p>
          <br />
          <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
          <br />
          <p>Playing basketball is his zen.</p>
        </div>
      </div>
    </>
   );
}

export default People;