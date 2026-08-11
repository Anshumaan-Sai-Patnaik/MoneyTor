const sections = [
  {
    title: "Equity",
    icon: "fa-solid fa-chart-pie",
    value: "3.74k",
    change: "",
    label: "Margin available",
    profit: false,
    rows: [
      { label: "Margins used", value: "0" },
      { label: "Opening balance", value: "3.74k" },
    ],
  },
  {
    title: "Holdings (13)",
    icon: "fa-solid fa-briefcase",
    value: "1.55k",
    change: "+5.20%",
    label: "P&L",
    profit: true,
    rows: [
      { label: "Current Value", value: "31.43k" },
      { label: "Investment", value: "29.88k" },
    ],
  },
];

function Summary() {
  return (
    <div className="flex w-full max-w-[900px] flex-col">
      <h1 className="text-2xl text-gray-700">Hi, User!</h1>
      <hr className="my-5 h-px border-none bg-gray-300" />

      {sections.map((section) => (
        <div key={section.title} className="flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <i className={`${section.icon} text-gray-500`}></i>
            <p className="text-lg font-light text-gray-700">{section.title}</p>
          </div>

          <div className="flex w-1/2 max-[1300px]:w-full max-[600px]:flex-col items-center max-[600px]:items-start gap-10 max-[600px]:gap-5">
            <div className="min-w-[150px]">
              <h3 className={section.profit ? "text-[2.5rem] font-light text-green-600" : "text-[2.5rem] font-light text-gray-700"}>
                {section.value}
                {section.change && <small className="ml-2 text-sm text-green-600">{section.change}</small>}
              </h3>
              <p className="text-xs text-gray-500">{section.label}</p>
            </div>

            <div className="h-[70px] w-px bg-gray-200 max-[600px]:hidden"></div>

            <div className="flex flex-col gap-2.5">
              {section.rows.map((row) => (
                <p key={row.label} className="flex items-center justify-between gap-6 min-w-[180px] whitespace-nowrap text-xs text-gray-500">
                  {row.label}
                  <span className="text-sm text-gray-600">{row.value}</span>
                </p>
              ))}
            </div>
          </div>

          <hr className="my-6 h-px border-none bg-gray-300" />
        </div>
      ))}
    </div>
  );
}

export default Summary;
