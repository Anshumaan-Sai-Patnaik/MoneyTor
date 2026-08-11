function Links() {
  const quickLinks = [
    "Track account opening",
    "Track segment activation",
    "Intraday margins",
    "Kite user manual",
    "Learn how to create a ticket",
  ];
  
  return ( 
    <>
      <div className="flex justify-center w-full my-4 px-8">
        <div className="flex p-4 w-full max-w-[700px] border-l-9 border-orange-500 bg-orange-50">
          <ul className="list-disc pl-10">
            <li className="text-blue-700 underline cursor-pointer my-2">Commodities option contract expiry – June 2026</li>
            <li className="text-blue-700 underline cursor-pointer my-2">Electricity contract expiry - June 2026</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center w-full p-5">
        <div className="w-full max-w-[800px] border border-gray-300 bg-white">
          <div className="bg-gray-100 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Quick links
            </h2>
          </div>
          <div>
            {quickLinks.map((link, index) => (
              <div key={index} className="border-t border-gray-300 px-6 py-5">
                <p className="text-lg text-blue-600 cursor-pointer hover:text-gray-700"> {index + 1}. {link} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
   );
}

export default Links;