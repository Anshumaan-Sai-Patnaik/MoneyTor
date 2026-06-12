function HeroSection() {
  return ( 
    <>
      <div className="text-black text-xl text-center font-semibold my-9 max-w-[1100px]">
        <p>We pioneered the discount broking model in India.</p>
        <p>Now, we are breaking ground with our technology.</p>
      </div>
      <hr />
      <div className="flex flex-wrap justify-around w-full max-w-[900px] min[800px]:p-4 mb-20">
        <div className="flex-1 min-w-[378px] min[800px]:max-w-[432px]">
          <p className="text-lg text-gray-700 m-4">We kick-started operations with the vision of helping individuals take control of their financial future through technology, transparency, and accessibility. We named the company MoneyTor, a blend of "Money" and "Monitor", reflecting our mission to help users track, manage, and grow their wealth with confidence. By combining powerful financial tools with a seamless user experience, MoneyTor makes investing and financial management simpler for everyone.</p>          <p className="text-lg text-gray-700 m-4">Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>
          <p className="text-lg text-gray-700 m-4">Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
        </div>
        <div className="flex-1 min-w-[378px] min[800px]:max-w-[432px]">
          <p className="text-lg text-gray-700 m-4">In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>
          <p className="text-lg text-gray-700 m-4"><span className="text-blue-500 cursor-pointer">Rainmatter</span>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>
          <p className="text-lg text-gray-700 m-4">And yet, we are always up to something new every day. Catch up on the latest updates on our <span className="text-blue-500 cursor-pointer">blog</span> or see what the media is <span className="text-blue-500 cursor-pointer">saying about us</span> or learn more about our business and product <span className="text-blue-500 cursor-pointer">philosophies</span>.</p>
        </div>
      </div>
    </>
   );
}

export default HeroSection;