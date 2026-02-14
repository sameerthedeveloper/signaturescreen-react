import React from 'react';

const PanelPricing = ({ pricePerPanel, customPrice, setCustomPrice, totalPriceExclGst, totalPriceInclGst, extraPanels, setExtraPanels }) => {

  return (
    <div className="flex flex-col mb-4 bg-white p-6 gap-4 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-700 font-bold dark:text-white">Panel Pricing</h1>
      </div>

      <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-500 mb-1">Base Price / Panel</span>
                      <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        ₹ {pricePerPanel}
                      </div>
                  </div>
                  <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-500 mb-1">Custom Price</label>
                      <input
                            type="number"
                            placeholder="Overwrite"
                            value={customPrice}
                            onChange={(e) => setCustomPrice(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                  </div>
              </div>

               <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-500 mb-1">Additional Panels (Spares)</label>
                  <input
                        type="number"
                        placeholder="Enter count"
                        value={extraPanels}
                        onChange={(e) => setExtraPanels(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Total (excl. GST)</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹ {totalPriceExclGst}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Total (incl. GST)</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">₹ {totalPriceInclGst}</span>
                </div>
              </div>
      </div>
    </div>
  );
};

export default PanelPricing;
