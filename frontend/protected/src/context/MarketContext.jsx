import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import api, { extractMessage } from "../services/api";

const MarketContext = createContext(null);

const POLL = 2000;

const EMPTY = {
  watchlist: [],
  instruments: [],
  funds: { openingBalance: 0, payin: 0, cash: 0, usedMargin: 0, realisedPnl: 0, available: 0 },
  orders: [],
  positions: [],
  holdings: [],
};

export function MarketProvider({ children }) {
  const [snapshot, setSnapshot] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // loading tells you whether the request process is finished, not whether it succeeded. An empty data value alone can't distinguish between a successful empty response and a failed request; in both cases, loading is false, which is why we need hasData to tell whether we actually received valid data.
  const [hasData, setHasData] = useState(false);

  const [orderTarget, setOrderTarget] = useState(null);
  const prevPrices = useRef({});

  const refresh = useCallback(async () => {
    try {
      const { data } = await api.get("/snapshot");
      setSnapshot((current) => {
        prevPrices.current = Object.fromEntries(
          current.instruments.map((i) => [i.name, i.price])
        );
        return data;
      });
      setError(null);
      setHasData(true);
    } catch (err) {
      setError(
        err?.response ? extractMessage(err) : `Cannot reach the API at ${api.defaults.baseURL}`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL);
    return () => clearInterval(id);
  }, [refresh]);

  const openOrder = (name, mode) => setOrderTarget({ name, mode });
  const closeOrder = () => setOrderTarget(null);

  const placeOrder = useCallback(
    async (payload) => {
      const { data } = await api.post("/orders", payload);
      await refresh();
      return data;
    },
    [refresh]
  );
  const cancelOrder = useCallback(
    async (id) => {
      await api.delete(`/orders/${id}`);
      await refresh();
    },
    [refresh]
  );

  const squareOff = useCallback(async () => {
    const { data } = await api.post("/session/square-off");
    await refresh();
    return data;
  }, [refresh]);

  const find = useCallback(
    (name) => snapshot.instruments.find((i) => i.name === name) || null,
    [snapshot.instruments]
  );

  const cncSaleable = useCallback(
    (name) => {
      const holding = snapshot.holdings.find((h) => h.name === name);
      const position = snapshot.positions.find((p) => p.name === name && p.product === "CNC");
      const held = (holding ? holding.qty : 0) + (position ? Math.max(position.qty, 0) : 0);
      const committed = snapshot.orders
        .filter((o) => o.name === name && o.product === "CNC" && o.mode === "SELL" && o.status === "OPEN")
        .reduce((sum, o) => sum + o.qty, 0);
      return { held, committed, saleable: held - committed };
    },
    [snapshot.holdings, snapshot.positions, snapshot.orders]
  );

  const value = {
    ...snapshot,
    loading,
    error,
    hasData,
    orderTarget,
    prevPrices: prevPrices.current,
    refresh,
    openOrder,
    closeOrder,
    placeOrder,
    cancelOrder,
    squareOff,
    find,
    cncSaleable
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be used inside a MarketProvider");
  return context;
}
