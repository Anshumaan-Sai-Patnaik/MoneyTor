const apps = [
  {
    name: "Kite",
    icon: "fa-solid fa-chart-line",
    description: "Our ultra-fast flagship trading platform with streaming market data, advanced charts, and an elegant UI.",
    action: "Try demo",
  },
  {
    name: "Console",
    icon: "fa-solid fa-gauge-high",
    description: "The central dashboard for your MoneyTor account. In-depth reports and visualisations of your trades.",
    action: "Open Console",
  },
  {
    name: "Coin",
    icon: "fa-solid fa-coins",
    description: "Buy direct mutual funds online, commission-free, delivered directly to your Demat account.",
    action: "Explore Coin",
  },
  {
    name: "Kite Connect",
    icon: "fa-solid fa-code",
    description: "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs.",
    action: "Read the docs",
  },
  {
    name: "Varsity",
    icon: "fa-solid fa-graduation-cap",
    description: "An easy to grasp collection of stock market lessons with in-depth coverage and illustrations.",
    action: "Start learning",
  },
];

function AppsSection() {
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-[1.3rem] font-light text-gray-600">Apps</h3>
      <p className="mt-1 mb-6 text-sm text-gray-400">The MoneyTor ecosystem — connected to your account.</p>

      <div className="flex flex-wrap gap-6 max-[600px]:gap-4">
        {apps.map((app) => (
          <div key={app.name} className="flex flex-1 min-w-[280px] max-w-[400px] flex-col gap-3 border border-gray-300 p-6 max-[600px]:p-5 hover:border-blue-600 transition-colors">
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-blue-100">
              <i className={`${app.icon} text-blue-700`}></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-800">{app.name}</h4>
            <p className="flex-1 text-sm text-gray-500">{app.description}</p>
            <span className="text-sm text-blue-600 whitespace-nowrap hover:text-blue-700 transition-colors cursor-pointer">{app.action} <i className="fa-solid fa-arrow-right text-xs"></i></span>
          </div>
        ))}
      </div>
    </div>
   );
}

export default AppsSection;
