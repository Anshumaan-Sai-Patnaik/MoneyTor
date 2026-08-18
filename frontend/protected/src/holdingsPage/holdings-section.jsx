import { useMarket } from "../context/MarketContext";
import { fmt, pct, dayChange, thClass, tdClass, signClass } from "../utils/table";

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
  const { holdings, loading, openOrder } = useMarket();

  const investment = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const current = holdings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const pnl = current - investment;
  const pnlPercent = investment ? (pnl / investment) * 100 : 0;

  if (loading) return <p className="text-sm font-light text-gray-400">Loading holdings...</p>;

  return (
    <div className="flex w-full flex-col">
      <h3 className="mb-4 text-[1.3rem] font-light text-gray-600">Holdings ({holdings.length})</h3>

      {holdings.length === 0 ? (
        <p className="py-10 text-sm font-light text-gray-400">You don't have any holdings yet.</p>
      ) : (
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
                <th className={thClass}></th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((stock) => {
                const curValue = stock.price * stock.qty;
                const invested = stock.avg * stock.qty;
                const rowPnl = curValue - invested;
                const net = invested ? (rowPnl / invested) * 100 : 0;
                const day = dayChange(stock.price, stock.prevClose);

                return (
                  <tr key={stock.name} className="border-y border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className={`${tdClass} border-r border-gray-200 text-left`}>{stock.name}</td>
                    <td className={tdClass}>{stock.qty}</td>
                    <td className={`${tdClass} ${hideSm}`}>{fmt(stock.avg)}</td>
                    <td className={`${tdClass} border-r border-gray-200`}>{fmt(stock.price)}</td>
                    <td className={tdClass}>{fmt(curValue)}</td>
                    <td className={`${tdClass} ${signClass(rowPnl)}`}>{fmt(rowPnl)}</td>
                    <td className={`${tdClass} ${hideMd} ${signClass(net)}`}>{pct(net)}</td>
                    <td className={`${tdClass} ${hideMd} ${signClass(day)}`}>{pct(day)}</td>
                    <td className={tdClass}>
                      <button onClick={() => openOrder(stock.name, "SELL")} className="rounded-sm border border-gray-300 px-3 py-1 text-xs text-gray-500 hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer">Sell</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10 flex flex-wrap justify-between gap-6 max-[600px]:gap-4">
        <Totals value={<Amount value={investment} />} label="Total investment" />
        <Totals value={<Amount value={current} />} label="Current value" />
        <Totals value={`${fmt(pnl)} (${pct(pnlPercent)})`} label="P&L" profit={pnl >= 0} />
      </div>
    </div>
   );
}

export default HoldingsSection;
