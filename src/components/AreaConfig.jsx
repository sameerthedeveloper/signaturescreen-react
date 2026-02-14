import React from 'react';

const AreaConfig = ({ areaMm, areaFt, msp, setMsp, pricePerSqM }) => {
  return (
    <div className="flex flex-col m-4 bg-white p-6 gap-4 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-gray-700 font-bold dark:text-white">Area Configuration</h1>

      {/* Area Displays */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
           <span className="text-xs font-semibold text-gray-500 mb-1">Sq. Meter</span>
           <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-semibold text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
             {areaMm}
           </div>
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-semibold text-gray-500 mb-1">Sq. Feet</span>
           <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-semibold text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
             {areaFt}
           </div>
        </div>
      </div>

      <hr className="border-gray-100 dark:border-gray-700"/>

      {/* MSP & Total */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
           <label className="text-xs font-semibold text-gray-500 mb-1">Price / Sq Meter</label>
           <input
                type="number"
                placeholder="0"
                value={msp}
                onChange={(e) => setMsp(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500 mb-1">Total Area Price</span>
            <div className="bg-gray-100 border border-gray-200 p-2.5 rounded-lg text-sm font-semibold text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
             {pricePerSqM}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AreaConfig;
