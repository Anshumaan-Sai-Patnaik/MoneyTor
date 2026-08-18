import { useState } from "react";
import { Link } from 'react-router-dom'
import { useMarket } from "../context/MarketContext";
import { extractMessage } from "../services/api";
import { fmt, thClass, tdClass } from "../utils/table";

const hideSm = "max-[700px]:hidden";

const statusClass = { OPEN: "bg-amber-100 text-amber-700", EXECUTED: "bg-green-100 text-green-700", REJECTED: "bg-red-100 text-red-600", CANCELLED: "bg-gray-200 text-gray-500" };
const label = { OPEN: "Waiting", EXECUTED: "Executed", REJECTED: "Rejected", CANCELLED: "Cancelled" };

const time = (value) =>
  value ? new Date(value).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "—";

function OrderTable({ orders, onCancel, cancelling }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[620px] border-collapse">
        <thead>
          <tr className="border-y border-gray-200">
            <th className={`${thClass} ${hideSm} text-left`}>Time</th>
            <th className={`${thClass} text-left`}>Instrument</th>
            <th className={`${thClass} text-left`}>Type</th>
            <th className={thClass}>Qty.</th>
            <th className={thClass}>Price</th>
            <th className={`${thClass} text-left`}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-y border-gray-200 hover:bg-gray-50 transition-colors">
              <td className={`${tdClass} ${hideSm} text-left font-light text-gray-400`}>{time(order.placedAt)}</td>
              <td className={`${tdClass} text-left`}>{order.name}</td>
              <td className={`${tdClass} text-left font-light text-gray-400`}>
                <span className={order.mode === "BUY" ? "font-medium text-blue-600" : "font-medium text-red-500"}>{order.mode}</span> · {order.product} · {order.orderType}
                {order.source === "SQUAREOFF" && (<span className="ml-2 inline-block rounded-sm bg-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">AUTO</span>)}
              </td>
              <td className={tdClass}>{order.qty}</td>
              <td className={tdClass}>{order.status === "EXECUTED" ? fmt(order.executedPrice) : order.limitPrice ? fmt(order.limitPrice) : "Market"}</td>
              <td className={`${tdClass} text-left`}>
                <span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-medium ${statusClass[order.status]}`}>{label[order.status]}</span>
                {order.rejectionReason && (<span className="ml-2 text-xs font-light text-gray-400">{order.rejectionReason}</span>)}
              </td>
              <td className={tdClass}>
                {order.status === "OPEN" && (
                  <button onClick={() => onCancel(order._id)} disabled={cancelling === order._id} className="rounded-sm border border-gray-300 px-3 py-1 text-xs text-gray-500 hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50">
                    {cancelling === order._id ? "..." : "Cancel"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrdersSection() {
  const { orders, loading, cancelOrder } = useMarket();
  const [cancelling, setCancelling] = useState(null);
  const [error, setError] = useState(null);

  const open = orders.filter((order) => order.status === "OPEN");
  const closed = orders.filter((order) => order.status !== "OPEN");

  const handleCancel = async (id) => {
    setCancelling(id);
    setError(null);
    try {
      await cancelOrder(id);
    } catch (err) {
      setError(extractMessage(err));
    } finally {
      setCancelling(null);
    }
  };

  if (loading) return <p className="text-sm font-light text-gray-400">Loading orders...</p>;
  if (orders.length === 0) return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-7 max-[600px]:gap-5 px-4 text-center">
      <i className="fa-regular fa-rectangle-list text-[5rem] max-[600px]:text-[3.5rem] text-gray-300"></i>
      <p className="text-lg max-[600px]:text-base font-light text-gray-400">You haven't placed any orders today</p>
      <Link to='/' className="btn btn-primary h-[40px] rounded-sm border-blue-600 bg-blue-600 px-8 text-sm font-medium text-white hover:border-blue-700 hover:bg-blue-700">Get started</Link>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-10">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex flex-col">
        <h3 className="mb-4 text-[1.3rem] font-light text-gray-600">Open orders ({open.length})</h3>
        {open.length === 0 ? ( <p className="py-6 text-sm font-light text-gray-400">Nothing waiting to fill.</p> ) : ( <OrderTable orders={open} onCancel={handleCancel} cancelling={cancelling} /> )}
      </div>

      <div className="flex flex-col">
        <h3 className="mb-4 text-[1.3rem] font-light text-gray-600">Order history ({closed.length})</h3>
        {closed.length === 0 ? ( <p className="py-6 text-sm font-light text-gray-400">No completed orders yet.</p> ) : ( <OrderTable orders={closed} onCancel={handleCancel} cancelling={cancelling} /> )}
      </div>
    </div>
  );
}

export default OrdersSection;
