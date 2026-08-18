import { useState } from "react";
import { useMarket } from "../context/MarketContext";
import { extractMessage } from "../services/api";
import { fmt, pct, dayChange, thClass, tdClass, signClass } from "../utils/table";

const hideSm = "max-[700px]:hidden";

const badgeClass = (product) =>
  product === "CNC"
    ? "inline-block rounded-sm bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"
    : "inline-block rounded-sm bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700";

function settlesIn(settlesAt) {
  if (!settlesAt) return "—";
  
  const remaining = new Date(settlesAt).getTime() - Date.now();
  if (remaining <= 0) return "settling...";
  
  const minutes = Math.floor(remaining / 60000); const seconds = Math.floor((remaining % 60000) / 1000);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function SquareOffPanel({ misPositions, pendingMis }) {
  const { squareOff } = useMarket();

  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const shorts = misPositions.filter((p) => p.qty < 0);

  const run = async () => {
    setRunning(true);
    setError(null);
    try {
      setResult(await squareOff());
    } catch (err) {
      setError(extractMessage(err));
    } finally {
      setRunning(false);
    }
  };

  if (result) {
    return (
      <div className="mb-8 rounded-sm border border-gray-300 p-5">
        <p className="mb-3 text-sm font-medium text-gray-700">Session closed</p>
        {result.closedPositions.length === 0 ? (
          <p className="text-sm font-light text-gray-400">There were no intraday positions to close.</p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {result.closedPositions.map((closed) => (
              <p key={`${closed.name}-${closed.mode}`} className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{closed.mode}</span> {closed.qty} {closed.name} at {fmt(closed.price)}
                <span className={signClass(closed.realised)}>{fmt(closed.realised)}</span>
              </p>
            ))}
          </div>
        )}
        {result.cancelledOrders > 0 && (
          <p className="mt-3 text-xs font-light text-gray-400">
            {result.cancelledOrders} waiting intraday {result.cancelledOrders === 1 ? "order was" : "orders were"} cancelled
            {result.releasedMargin > 0 ? `, releasing ${fmt(result.releasedMargin)} back into your funds.` : ". Waiting sells block no margin, so nothing was returned."}
          </p>
        )}
        {result.brokerCovered && (
          <p className="mt-3 rounded-sm bg-red-50 px-3 py-2 text-xs text-red-600">
            You didn't have the funds to buy back your short, so the broker covered it. Your account is now in deficit at {fmt(result.funds.available)}.
          </p>
        )}
        <button onClick={() => setResult(null)} className="mt-4 rounded-sm border border-gray-300 px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">Dismiss</button>
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-gray-300 px-5 py-4">
      <div>
        <p className="text-sm text-gray-700">End the intraday session</p>
        <p className="mt-0.5 text-xs font-light text-gray-400">
          Closes all {misPositions.length} MIS {misPositions.length === 1 ? "position" : "positions"} {shorts.length > 0 && ` (${shorts.length} short, bought back at market)`} {pendingMis > 0 && `, cancels ${pendingMis} waiting intraday ${pendingMis === 1 ? "order" : "orders"}`}.
        </p>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
      <button onClick={run} disabled={running} className="rounded-sm border border-gray-400 bg-white px-5 py-2 text-sm text-gray-600 hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50">
        {running ? "Closing..." : "Square off"}
      </button>
    </div>
  );
}

function PositionsSection() {
  const { positions, orders, loading, openOrder } = useMarket();

  const misPositions = positions.filter((p) => p.product === "MIS");
  const pendingMis = orders.filter((o) => o.status === "OPEN" && o.product === "MIS").length;

  if (loading) return <p className="text-sm font-light text-gray-400">Loading positions...</p>;

  return (
    <div className="flex w-full flex-col">
      <h3 className="mb-4 text-[1.3rem] font-light text-gray-600">Positions ({positions.length})</h3>

      {(misPositions.length > 0 || pendingMis > 0) && ( <SquareOffPanel misPositions={misPositions} pendingMis={pendingMis} /> )}

    {positions.length === 0 ? (
        <p className="py-10 text-sm font-light text-gray-400">You don't have any open positions.</p>
      ) : (
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
                <th className={`${thClass} ${hideSm}`}>Settles in</th>
                <th className={thClass}></th>
              </tr>
            </thead>
            <tbody>
              {positions.map((stock) => {
                const pnl = (stock.price - stock.avg) * stock.qty;
                const day = dayChange(stock.price, stock.prevClose);
                const isShort = stock.qty < 0;

                return (
                  <tr key={`${stock.name}-${stock.product}`} className="border-y border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className={`${tdClass} text-left`}><span className={badgeClass(stock.product)}>{stock.product}</span></td>
                    <td className={`${tdClass} border-r border-gray-200 text-left`}>{stock.name}{isShort && (<span className="ml-2 inline-block rounded-sm bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-600">SHORT</span>)}</td>
                    <td className={`${tdClass} ${isShort ? "text-red-500" : ""}`}>{stock.qty}</td>
                    <td className={`${tdClass} ${hideSm}`}>{fmt(stock.avg)}</td>
                    <td className={`${tdClass} border-r border-gray-200`}>{fmt(stock.price)}</td>
                    <td className={`${tdClass} ${signClass(pnl)}`}>{fmt(pnl)}</td>
                    <td className={`${tdClass} ${signClass(day)}`}>{pct(day)}</td>
                    <td className={`${tdClass} ${hideSm} font-light text-gray-400`}>{settlesIn(stock.settlesAt)}</td>
                    <td className={tdClass}><button onClick={() => openOrder(stock.name, isShort ? "BUY" : "SELL")} className="rounded-sm border border-gray-300 px-3 py-1 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer">{isShort ? "Cover" : "Exit"}</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs font-light text-gray-400">CNC positions move to holdings once they settle. MIS positions stay intraday and are closed at the end of the session — a short is bought back, a long is sold.</p>
    </div>
   );
}

export default PositionsSection;
