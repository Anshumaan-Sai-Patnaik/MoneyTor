import { useMarket } from "../context/MarketContext";
import { fmt } from "../utils/table";

const valueClass = (row) => {
  if (row.value < 0) return "text-2xl max-[600px]:text-xl font-light text-red-500";
  if (row.accent) return "text-2xl max-[600px]:text-xl font-light text-blue-600";
  if (row.highlight) return "text-2xl max-[600px]:text-xl font-light text-gray-700";
  return "text-sm text-gray-600";
};

const buildGroups = (funds) => [
  [
    { label: "Available margin", value: funds.available, highlight: true, accent: true },
    { label: "Used margin", value: funds.usedMargin, highlight: true },
    { label: "Available cash", value: funds.available, highlight: true },
  ],
  [
    { label: "Opening Balance", value: funds.openingBalance },
    { label: "Payin", value: funds.payin },
    { label: "Realised P&L", value: funds.realisedPnl },
    { label: "SPAN", value: 0 },
    { label: "Delivery margin", value: 0 },
    { label: "Exposure", value: 0 },
    { label: "Options premium", value: 0 },
  ],
  [
    { label: "Collateral (Liquid funds)", value: 0 },
    { label: "Collateral (Equity)", value: 0 },
    { label: "Total Collateral", value: 0 },
  ],
];

function FundsSection() {
  const { funds, orders, loading } = useMarket();
  
  const blocked = orders.filter((order) => order.status === "OPEN");
  const equityGroups = buildGroups(funds);

  if (loading) return <p className="text-sm font-light text-gray-400">Loading funds...</p>;

  return (
    <div className="flex w-full flex-col">

      <div className="flex flex-wrap items-center justify-end gap-3 max-[600px]:justify-center">
        <p className="text-xs text-gray-400 max-[600px]:w-full max-[600px]:text-center">Instant, zero-cost fund transfers with UPI</p>
        <button className="btn h-[40px] rounded-sm border-green-600 bg-green-600 px-6 text-sm font-medium text-white hover:border-green-700 hover:bg-green-700">Add funds</button>
        <button className="btn h-[40px] rounded-sm border-blue-600 bg-blue-600 px-6 text-sm font-medium text-white hover:border-blue-700 hover:bg-blue-700">Withdraw</button>
      </div>

      {funds.available < 0 && ( <p className="mt-6 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"> Your account is in deficit of {fmt(Math.abs(funds.available))}. The broker covered a short position you didn't have the funds to buy back. Add funds to clear it — no new orders can be placed until you do.</p> )}

      <div className="mt-8 flex flex-wrap gap-8 max-[900px]:gap-6">

        <div className="flex flex-1 min-w-[300px] flex-col">
          <div className="mb-4 flex items-center gap-3">
            <i className="fa-solid fa-chart-pie text-gray-500"></i>
            <p className="text-lg font-light text-gray-700">Equity</p>
          </div>

          <div className="border border-gray-300 px-8 py-6 max-[600px]:px-5">
            {equityGroups.map((group, groupIndex) => (
              <div key={group[0].label}>
                {groupIndex > 0 && <hr className="my-5 h-px border-none bg-gray-300" />}
                {group.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-2">
                    <p className="text-sm text-gray-500">{row.label}</p>
                    <p className={`${valueClass(row)} whitespace-nowrap`}>{fmt(row.value)}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {blocked.length > 0 && ( <p className="mt-3 text-xs font-light text-gray-400"> {blocked.length} waiting {blocked.length === 1 ? "order is" : "orders are"} holding{" "} {fmt(blocked.reduce((sum, order) => sum + order.blockedAmount, 0))} of your used margin.</p> )}
        </div>

        <div className="flex flex-1 min-w-[300px] flex-col">
          <div className="mb-4 flex items-center gap-3">
            <i className="fa-solid fa-wheat-awn text-gray-500"></i>
            <p className="text-lg font-light text-gray-700">Commodity</p>
          </div>

          <div className="flex flex-col items-center gap-6 border border-gray-300 px-8 py-12 max-[600px]:px-5 text-center">
            <p className="text-sm text-gray-500">You don't have a commodity account</p>
            <button className="btn h-[40px] rounded-sm border-blue-600 bg-blue-600 px-6 text-sm font-medium text-white hover:border-blue-700 hover:bg-blue-700">Open Account</button>
          </div>
        </div>

      </div>
    </div>
   );
}

export default FundsSection;
