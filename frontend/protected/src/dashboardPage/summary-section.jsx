import { useMarket } from "../context/MarketContext";
import { compact, fmt, pct } from "../utils/table";

function Summary() {
  const { funds, holdings, positions, orders, loading } = useMarket();

  const investment = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const current = holdings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const pnl = current - investment;
  const pnlPercent = investment ? (pnl / investment) * 100 : 0;

  const openOrders = orders.filter((order) => order.status === "OPEN").length;

  const sections = [
    {
      title: "Equity",
      icon: "fa-solid fa-chart-pie",
      value: compact(funds.available),
      change: "",
      label: "Margin available",
      profit: false,
      rows: [
        { label: "Margins used", value: compact(funds.usedMargin) },
        { label: "Opening balance", value: compact(funds.openingBalance) },
      ],
    },
    {
      title: `Holdings (${holdings.length})`,
      icon: "fa-solid fa-briefcase",
      value: compact(pnl),
      change: pct(pnlPercent),
      label: "P&L",
      profit: pnl >= 0,
      rows: [
        { label: "Current Value", value: compact(current) },
        { label: "Investment", value: compact(investment) },
      ],
    },
  ];

  if (loading) return <p className="text-sm font-light text-gray-400">Loading...</p>;

  return (
    <div className="flex w-full max-w-[900px] flex-col">
      <h1 className="text-2xl text-gray-700">Hi, User!</h1>
      <hr className="my-5 h-px border-none bg-gray-300" />

      {sections.map((section) => (
        <div key={section.title} className="flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <i className={`${section.icon} text-gray-500`}></i>
            <p className="text-lg font-light text-gray-700">{section.title}</p>
          </div>

          <div className="flex w-1/2 max-[1300px]:w-full max-[600px]:flex-col items-center max-[600px]:items-start gap-10 max-[600px]:gap-5">
            <div className="min-w-[150px]">
              <h3 className={section.profit ? "text-[2.5rem] font-light text-green-600" : "text-[2.5rem] font-light text-gray-700"}>
                {section.value}
                {section.change && (<small className={section.profit ? "ml-2 text-sm text-green-600" : "ml-2 text-sm text-red-500"}>{section.change}</small>)}
              </h3>
              <p className="text-xs text-gray-500">{section.label}</p>
            </div>

            <div className="h-[70px] w-px bg-gray-200 max-[600px]:hidden"></div>

            <div className="flex flex-col gap-2.5">
              {section.rows.map((row) => (
                <p key={row.label} className="flex items-center justify-between gap-6 min-w-[180px] whitespace-nowrap text-xs text-gray-500">
                  {row.label}
                  <span className="text-sm text-gray-600">{row.value}</span>
                </p>
              ))}
            </div>
          </div>

          <hr className="my-6 h-px border-none bg-gray-300" />
        </div>
      ))}

      <div className="flex flex-wrap gap-10 max-[600px]:gap-5">
        <div>
          <p className="text-[1.3rem] font-light text-gray-700">{positions.length}</p>
          <p className="text-xs text-gray-500">Open positions</p>
        </div>
        <div>
          <p className="text-[1.3rem] font-light text-gray-700">{openOrders}</p>
          <p className="text-xs text-gray-500">Orders waiting</p>
        </div>
        <div>
          <p className="text-[1.3rem] font-light text-gray-700">{fmt(funds.usedMargin)}</p>
          <p className="text-xs text-gray-500">Margin used</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
