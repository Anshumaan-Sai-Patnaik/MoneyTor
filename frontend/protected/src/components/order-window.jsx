import { useEffect, useState } from "react";
import { useMarket } from "../context/MarketContext";
import { extractMessage } from "../services/api";
import { fmt, dayChange, pct, signClass } from "../utils/table";

const toggleClass = (active) =>
  active
    ? "flex-1 rounded-sm border border-blue-600 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors cursor-pointer"
    : "flex-1 rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 hover:border-gray-400 transition-colors cursor-pointer";

const inputClass =
  "w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-600 focus:outline-none";

function OrderWindow() {
  const { orderTarget, closeOrder, find, funds, placeOrder, cncSaleable } = useMarket();

  const [qty, setQty] = useState("1");
  const [product, setProduct] = useState("CNC");
  const [orderType, setOrderType] = useState("MARKET");
  const [limitPrice, setLimitPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const name = orderTarget?.name;
  const mode = orderTarget?.mode || "BUY";
  const instrument = name ? find(name) : null;

  useEffect(() => {
    if (!orderTarget) return;
    setQty("1");
    setProduct("CNC");
    setOrderType("MARKET");
    setError(null);
    setResult(null);
    setSubmitting(false);
  }, [orderTarget]);

  // Default/Initialize the limit field to the current price so it is never blank.
  useEffect(() => {
    if (orderTarget && instrument && limitPrice === "") {
      setLimitPrice(String(instrument.price));
    }
  }, [orderTarget, instrument, limitPrice]);

  if (!orderTarget || !instrument) return null;

  const buying = mode === "BUY";
  const close = () => {
    setLimitPrice("");
    closeOrder();
  };

  const basis = orderType === "MARKET" ? instrument.price : Number(limitPrice);
  const value = Number(qty) > 0 && basis > 0 ? Number(qty) * basis : 0;

  const qtyValid = Number.isInteger(Number(qty)) && Number(qty) > 0;
  const limitValid = orderType === "MARKET" || Number(limitPrice) > 0;

  // Buying is limited by money; selling delivery is limited by shares. Selling intraday is limited by neither, because it opens a short.
  const shortfall = buying ? value - funds.available : 0;
  const { held, saleable } = cncSaleable(name);
  const shareShortfall = !buying && product === "CNC" ? Number(qty) - saleable : 0;

  const canSubmit = qtyValid && limitValid && shortfall <= 0 && shareShortfall <= 0 && !submitting;

  const change = dayChange(instrument.price, instrument.prevClose);

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const order = await placeOrder({
        name,
        qty: Number(qty),
        mode,
        product,
        orderType,
        limitPrice: orderType === "LIMIT" ? Number(limitPrice) : null,
      });
      setResult(order);
    } catch (err) {
      setError(extractMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onClick={close}>
      <div className="w-full max-w-[440px] rounded-sm bg-white shadow-lg" onClick={(event) => event.stopPropagation()}>
        <div className={`flex items-center justify-between border-b px-5 py-4 ${buying ? "border-gray-200 bg-blue-50" : "border-gray-200 bg-red-50"}`}>
          <div>
            <p className="text-base font-medium text-gray-800">{buying ? "Buy" : "Sell"} {instrument.name}</p>
            <p className="mt-0.5 text-xs text-gray-500">{fmt(instrument.price)} <span className={signClass(change)}>{pct(change)}</span></p>
          </div>
          <button onClick={close} className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"><i className="fa-solid fa-xmark text-lg"></i></button>
        </div>

        {result ? (
          <OrderResult order={result} onClose={close} />
        ) : (
          <>
            <div className="flex flex-col gap-4 px-5 py-5">
              <div>
                <p className="mb-1.5 text-xs font-light text-gray-500">Product</p>
                <div className="flex gap-2">
                  <button className={toggleClass(product === "CNC")} onClick={() => setProduct("CNC")}>CNC <span className="font-light"> · delivery</span></button>
                  <button className={toggleClass(product === "MIS")} onClick={() => setProduct("MIS")}>MIS <span className="font-light"> · intraday</span></button>
                </div>
                <p className="mt-1.5 text-xs font-light text-gray-400">
                  {buying
                    ? product === "CNC" ? "Settles into holdings after 5 minutes." : "Stays a position and is squared off at the end of the session."
                    : product === "CNC" ? `Sells from your holdings first. You hold ${held}, ${saleable} free to sell.` : "Intraday: sells what you don't own as a short, closed at the end of the session."}
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <p className="mb-1.5 text-xs font-light text-gray-500">Quantity</p>
                  <input type="number" min="1" step="1" value={qty} onChange={(event) => setQty(event.target.value)} className={inputClass}/>
                </div>
                <div className="flex-1">
                  <p className="mb-1.5 text-xs font-light text-gray-500">Price</p>
                  <input type="number" step="0.05" value={orderType === "MARKET" ? instrument.price : limitPrice} disabled={orderType === "MARKET"} onChange={(event) => setLimitPrice(event.target.value)} className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-400`}/>
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-light text-gray-500">Order type</p>
                <div className="flex gap-2">
                  <button className={toggleClass(orderType === "MARKET")} onClick={() => setOrderType("MARKET")}>Market</button>
                  <button className={toggleClass(orderType === "LIMIT")} onClick={() => setOrderType("LIMIT")}>Limit</button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{buying ? "Margin required" : "Estimated proceeds"}</p>
                  <p className="text-sm text-gray-700">{fmt(value)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Available</p>
                  <p className={`text-sm ${funds.available < 0 ? "text-red-500" : "text-gray-700"}`}>{fmt(funds.available)}</p>
                </div>
              </div>

              {buying && shortfall > 0 && (
                <p className="text-xs text-red-500">Short by {fmt(shortfall)}. The order would be rejected.</p>
              )}
              {!buying && product === "CNC" && shareShortfall > 0 && (
                <p className="text-xs text-red-500">{saleable === 0 ? "You have no shares free to sell." : `You can only sell ${saleable}.`}</p>
              )}
              {!buying && product === "MIS" && Number(qty) > 0 && (
                <p className="text-xs text-amber-600">This opens a short of {qty}. It is bought back at the end of the session, at whatever the price is then.</p>
              )}
              {!qtyValid && <p className="text-xs text-red-500">Quantity must be a whole number above zero.</p>}
              {!limitValid && <p className="text-xs text-red-500">Enter a limit price above zero.</p>}
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-5 py-3.5">
              <p className="text-xs font-light text-gray-400">
                {orderType === "LIMIT"
                  ? buying ? "Fills at or below your limit" : "Fills at or above your limit"
                  : "Fills at the current market price"}
              </p>
              <div className="flex gap-2">
                <button onClick={close} className="rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button onClick={submit} disabled={!canSubmit} className={`rounded-sm px-6 py-2 text-sm font-medium text-white transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 ${buying ? "bg-blue-600 hover:bg-blue-700" : "bg-red-500 hover:bg-red-600"}`}>
                  {submitting ? "Placing..." : buying ? "Buy" : "Sell"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OrderResult({ order, onClose }) {
  const verb = order.mode === "BUY" ? "Bought" : "Sold";

  const states = {
    EXECUTED: {
      icon: "fa-solid fa-circle-check text-green-600",
      title: "Order executed",
      detail: `${verb} ${order.qty} ${order.name} at ${fmt(order.executedPrice)}.${
        order.mode === "SELL" && order.product === "MIS" ? " Check positions — this may be a short." : " It's in your positions now."
      }`,
    },
    OPEN: {
      icon: "fa-solid fa-clock text-amber-500",
      title: "Order is waiting",
      detail: `Waiting for ${order.name} to reach ${fmt(order.limitPrice)}.${
        order.blockedAmount > 0 ? ` ${fmt(order.blockedAmount)} has been blocked from your available funds.` : ""
      }`,
    },
    REJECTED: {
      icon: "fa-solid fa-circle-xmark text-red-500",
      title: "Order rejected",
      detail: order.rejectionReason || "The order could not be placed.",
    },
  };

  const state = states[order.status] || states.REJECTED;

  return (
    <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
      <i className={`${state.icon} text-4xl`}></i>
      <p className="text-base font-medium text-gray-800">{state.title}</p>
      <p className="max-w-[320px] text-sm font-light text-gray-500">{state.detail}</p>
      <button onClick={onClose} className="mt-2 rounded-sm bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer" >Done</button>
    </div>
  );
}

export default OrderWindow;
