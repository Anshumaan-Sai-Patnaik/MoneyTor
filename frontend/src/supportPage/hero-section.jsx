function HeroSection() {
  return ( 
    <div className="flex w-full items-center p-5 flex-col bg-slate-100">
      <div className="flex w-full mt-4 max-w-[1100px] mb-8 justify-between">
        <h1 className="text-black text-4xl max-[800px]:text-xl font-semibold">Support Portal</h1>
        <div className="btn btn-primary w-[105px] text-sm bg-sky-700/100 h-[35px] border-sky-500 hover:bg-black font-Bold">My tickets</div>
      </div>
      <input type="text" placeholder="Eg: How do I open my account, How do i activate F&O..." className="input focus:none focus:border focus:outline-none bg-white text-black max-w-[1100px]" style={{ width:'100%', height:'55px', fontSize:'17px' }}/>
    </div>
  );
}

export default HeroSection;