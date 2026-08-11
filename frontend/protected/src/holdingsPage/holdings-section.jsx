import { fmt, thClass, tdClass, signClass } from "../table";

import { holdings } from "../data/data";

const hideMd = "max-[900px]:hidden";
const hideSm = "max-[700px]:hidden";

function Amount({ value }) {
  const [whole, decimals] = fmt(value).split(".");
  return <>{whole}.<span className="text-sm font-light">{decimals}</span></>;
}

function Totals({ value, label, profit }) {
  return (
    <div className="flex flex-1 min-w-[150px] flex-col">
      <h5 className={profit ? "text-[1.8rem] max-[600px]:text-2xl font-light text-green-600" : "text-[1.8rem] max-[600px]:text-2xl font-light text-gray-600"}>
        {value}
      </h5>
      <p className="mt-1 text-xs font-light text-gray-400">{label}</p>
    </div>
  );
}

function HoldingsSection() {
  const investment = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const current = holdings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const pnl = current - investment;
  const pnlPercent = (pnl / investment) * 100;

  return (
    <div className="flex w-full flex-col">
      <h3 className="mb-4 text-[1.3rem] font-light text-gray-600">Holdings ({holdings.length})</h3>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[460px] border-collapse">
          <thead>
            <tr className="border-y border-gray-200">
              <th className={`${thClass} border-r border-gray-200 text-left`}>Instrument</th>
              <th className={thClass}>Qty.</th>
              <th className={`${thClass} ${hideSm}`}>Avg. cost</th>
              <th className={`${thClass} border-r border-gray-200`}>LTP</th>
              <th className={thClass}>Cur. val</th>
              <th className={thClass}>P&L</th>
              <th className={`${thClass} ${hideMd}`}>Net chg.</th>
              <th className={`${thClass} ${hideMd}`}>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock) => {
              const curValue = stock.price * stock.qty;
              const rowPnl = curValue - stock.avg * stock.qty;
              const profit = rowPnl >= 0;

              return (
                <tr key={stock.name} className="border-y border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className={`${tdClass} border-r border-gray-200 text-left`}>{stock.name}</td>
                  <td className={tdClass}>{stock.qty}</td>
                  <td className={`${tdClass} ${hideSm}`}>{fmt(stock.avg)}</td>
                  <td className={`${tdClass} border-r border-gray-200`}>{fmt(stock.price)}</td>
                  <td className={tdClass}>{fmt(curValue)}</td>
                  <td className={profit ? `${tdClass} text-green-600` : `${tdClass} text-red-500`}>{fmt(rowPnl)}</td>
                  <td className={`${tdClass} ${hideMd} ${signClass(stock.net)}`}>{stock.net}</td>
                  <td className={`${tdClass} ${hideMd} ${signClass(stock.day)}`}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap justify-between gap-6 max-[600px]:gap-4">
        <Totals value={<Amount value={investment} />} label="Total investment" />
        <Totals value={<Amount value={current} />} label="Current value" />
        <Totals value={`${fmt(pnl)} (${pnl >= 0 ? "+" : ""}${pnlPercent.toFixed(2)}%)`} label="P&L" profit={pnl >= 0} />
      </div>
    </div>
   );
}

export default HoldingsSection;
