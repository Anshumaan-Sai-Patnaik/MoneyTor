import { fmt } from "../table";

const equityGroups = [
  [
    { label: "Available margin", value: 4043.10, highlight: true, accent: true },
    { label: "Used margin", value: 3757.30, highlight: true },
    { label: "Available cash", value: 4043.10, highlight: true },
  ],
  [
    { label: "Opening Balance", value: 3736.40 },
    { label: "Payin", value: 4064.00 },
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

const valueClass = (row) => {
  if (row.accent) return "text-2xl max-[600px]:text-xl font-light text-blue-600";
  if (row.highlight) return "text-2xl max-[600px]:text-xl font-light text-gray-700";
  return "text-sm text-gray-600";
};

function FundsSection() {
  return (
    <div className="flex w-full flex-col">

      <div className="flex flex-wrap items-center justify-end gap-3 max-[600px]:justify-center">
        <p className="text-xs text-gray-400 max-[600px]:w-full max-[600px]:text-center">Instant, zero-cost fund transfers with UPI</p>
        <button className="btn h-[40px] rounded-sm border-green-600 bg-green-600 px-6 text-sm font-medium text-white hover:border-green-700 hover:bg-green-700">Add funds</button>
        <button className="btn h-[40px] rounded-sm border-blue-600 bg-blue-600 px-6 text-sm font-medium text-white hover:border-blue-700 hover:bg-blue-700">Withdraw</button>
      </div>

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
