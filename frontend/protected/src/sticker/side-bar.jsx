import { watchlist } from "../data/data";

function SideBar() {
  return (
    <div className="fixed top-[60px] left-0 bottom-0 z-40 flex w-[32%] max-[1000px]:hidden flex-col border-r border-gray-200 bg-white shadow-[0_0_4px_1px_rgb(236,235,235)]">

      <div className="relative flex items-center border-b border-gray-200">
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="input w-full rounded-none border-none bg-white px-5 pr-20 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-none focus:outline-none"
        />
        <span className="absolute right-5 text-sm text-gray-400">{watchlist.length} / 50</span>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {watchlist.map((stock) => (
          <li key={stock.name} className="group relative flex items-center justify-between border-b border-gray-200 px-3.5 py-3 hover:bg-gray-100 cursor-move">
            <p className={stock.down ? "text-sm font-light text-red-500" : "text-sm font-light text-green-600"}>{stock.name}</p>

            <div className="flex items-center gap-2 group-hover:invisible">
              <span className="text-xs text-gray-500">{stock.percent}</span>
              <i className={stock.down ? "fa-solid fa-caret-down text-xs text-red-500" : "fa-solid fa-caret-up text-xs text-green-600"}></i>
              <span className={stock.down ? "text-sm font-light text-red-500" : "text-sm font-light text-green-600"}>{stock.price}</span>
            </div>

            <div className="absolute inset-y-0 right-3.5 hidden items-center gap-2 group-hover:flex">
              <button className="h-[30px] w-[40px] rounded-sm bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer">B</button>
              <button className="h-[30px] w-[40px] rounded-sm bg-red-500 text-xs font-medium text-white hover:bg-red-600 transition-colors cursor-pointer">S</button>
              <button className="h-[30px] w-[40px] rounded-sm border border-gray-400 bg-white text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"><i className="fa-solid fa-chart-simple text-xs"></i></button>
              <button className="h-[30px] w-[40px] rounded-sm border border-gray-400 bg-white text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"><i className="fa-solid fa-ellipsis text-xs"></i></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
