import { useMarket } from "../context/MarketContext";

function ConnectionGate({ children }) {
  const { error, hasData, loading, refresh } = useMarket();

  if (hasData) {
    return (
      <>
        {error && ( <p className="mb-4 rounded-sm border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-700">Lost contact with the API — showing the last values received. {error}</p> )}
        {children}
      </>
    );
  }

  if (loading) {
    return <p className="text-sm font-light text-gray-400">Connecting to the market...</p>;
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <i className="fa-solid fa-plug-circle-xmark text-[3.5rem] text-gray-300"></i>
      <p className="text-lg font-light text-gray-500">Can't reach the MoneyTor API</p>
      <p className="max-w-[460px] text-sm font-light text-gray-400">{error}</p>
      <button onClick={refresh} className="mt-2 rounded-sm bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer">Retry</button>
    </div>
  );
}

export default ConnectionGate;
