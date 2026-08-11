import { Link, NavLink } from 'react-router-dom'

const indices = [
  { name: "NIFTY 50", points: "23,567.45", percent: "-99.25 (0.42%)", down: true },
  { name: "SENSEX", points: "77,689.98", percent: "-272.30 (0.35%)", down: true },
];

const menuLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Orders", to: "/orders" },
  { label: "Holdings", to: "/holdings" },
  { label: "Positions", to: "/positions" },
  { label: "Funds", to: "/funds" },
  { label: "Apps", to: "/apps" },
];

const menuClass = ({ isActive }) =>
  isActive
    ? "text-sm font-medium text-blue-600 transition-colors"
    : "text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors";

function TopBar() {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-[60px] w-full min-w-[400px] items-center bg-white shadow-[0_0_4px_2px_rgb(236,235,235)]">

      <div className="flex h-full w-[32%] max-[1000px]:hidden items-center justify-around border-r border-gray-200 px-5">
        {indices.map((index) => (
          <div key={index.name} className="flex items-center gap-1 cursor-pointer">
            <p className="text-xs font-medium uppercase whitespace-nowrap text-gray-600">{index.name}</p>
            <p className={index.down ? "text-xs font-medium text-red-500" : "text-xs font-medium text-green-600"}>{index.points}</p>
            <p className="text-xs text-gray-400 whitespace-nowrap max-[1350px]:hidden">{index.percent}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-between px-5 max-[500px]:px-3">
        <Link to='/' className="text-xl font-semibold text-blue-700 ">MoneyTor</Link>

        <div className="flex items-center">
          <ul className="flex items-center gap-4 max-[1055px]:hidden">
            {menuLinks.map((link) => (
              <li key={link.label}>
                <NavLink to={link.to} end={link.to === "/"} className={menuClass}>{link.label}</NavLink>
              </li>
            ))}
          </ul>

          <ul className="menu menu-horizontal min-[1055px]:hidden p-0 mr-3">
            <li>
              <details>
                <summary><i className="fa-solid fa-bars text-lg text-gray-600"></i></summary>
                <ul className="right-0 min-w-[160px] bg-white rounded-t-none p-2 z-50 shadow-md border border-gray-200">
                  {menuLinks.map((link) => (
                    <li key={link.label}><NavLink to={link.to} end={link.to === "/"} className={menuClass}>{link.label}</NavLink></li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>

          <div className="mx-4 h-[30px] w-px bg-gray-200 max-[1055px]:hidden"></div>

          <details className="dropdown dropdown-end">
            <summary className="flex list-none items-center gap-2 cursor-pointer group">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">U</div>
              <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors max-[600px]:hidden">User</p>
              <i className="fa-solid fa-chevron-down text-[10px] text-gray-400 max-[600px]:hidden"></i>
            </summary>
            <ul className="dropdown-content menu z-50 mt-2 w-[200px] rounded-sm border border-gray-200 bg-white p-2 shadow-md">
              <li className="border-b border-gray-200 px-3 py-2">
                <p className="text-sm font-medium text-gray-800">User</p>
                <p className="text-xs text-gray-400">user@moneytor.com</p>
              </li>
              <li><p className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">Profile</p></li>
              <li><p className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">Console</p></li>
              <li><p className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">Coin</p></li>
              <li><p className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">Support</p></li>
              <li><p className="text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer">Logout</p></li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}

export default TopBar;