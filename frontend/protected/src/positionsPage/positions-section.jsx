import { fmt, thClass, tdClass, signClass } from "../table";

import { positions } from "../data/data";

const hideSm = "max-[700px]:hidden";

const badgeClass = (product) =>
  product === "CNC"
    ? "inline-block rounded-sm bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"
    : "inline-block rounded-sm bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700";

function PositionsSection() {
  return (
    <div className="flex w-full flex-col">
      <h3 className="mb-4 text-[1.3rem] font-light text-gray-600">Positions ({positions.length})</h3>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse">
          <thead>
            <tr className="border-y border-gray-200">
              <th className={`${thClass} text-left`}>Product</th>
              <th className={`${thClass} border-r border-gray-200 text-left`}>Instrument</th>
              <th className={thClass}>Qty.</th>
              <th className={`${thClass} ${hideSm}`}>Avg.</th>
              <th className={`${thClass} border-r border-gray-200`}>LTP</th>
              <th className={thClass}>P&L</th>
              <th className={thClass}>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock) => {
              const pnl = (stock.price - stock.avg) * stock.qty;

              return (
                <tr key={`${stock.product}-${stock.name}`} className="border-y border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className={`${tdClass} text-left`}><span className={badgeClass(stock.product)}>{stock.product}</span></td>
                  <td className={`${tdClass} border-r border-gray-200 text-left`}>{stock.name}</td>
                  <td className={tdClass}>{stock.qty}</td>
                  <td className={`${tdClass} ${hideSm}`}>{fmt(stock.avg)}</td>
                  <td className={`${tdClass} border-r border-gray-200`}>{fmt(stock.price)}</td>
                  <td className={`${tdClass} ${pnl >= 0 ? "text-green-600" : "text-red-500"}`}>{fmt(pnl)}</td>
                  <td className={`${tdClass} ${signClass(stock.day)}`}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
   );
}

export default PositionsSection;
