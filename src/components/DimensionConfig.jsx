import React from 'react';

const DimensionConfig = ({ hPanels, setHPanels, vPanels, setVPanels, totalPanels, dimensions }) => {
  return (
    <div className="flex flex-col mb-4 bg-white p-6 gap-4 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
      <h1 className="text-gray-700 font-bold dark:text-white">Dimension Configuration</h1>

      {/* Panels Inputs */}
      <div className="grid grid-cols-3 gap-4">
        {/* V-Panels */}
        <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 mb-1">V-Panels</label>
            <input
                type="number"
                placeholder="0"
                value={vPanels}
                onChange={(e) => setVPanels(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
        </div>

         {/* H-Panels */}
         <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 mb-1">H-Panels</label>
            <input
                type="number"
                placeholder="0"
                value={hPanels}
                onChange={(e) => setHPanels(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
        </div>
        
        {/* Total Panels */}
        <div className="flex flex-col">
             <label className="text-xs font-semibold text-gray-500 mb-1">Total</label>
            <div className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-center dark:bg-gray-600 dark:border-gray-500 dark:text-white font-medium">
                {totalPanels}
            </div>
        </div>
      </div>

       {/* Diagonal */}
       <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Diagonal</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{dimensions.diagonal} inches</span>
       </div>
       
       <hr className="border-gray-200 dark:border-gray-600"/>

      <h2 className="text-sm font-semibold text-gray-500">Dimensions (mm)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
            <span className="text-xs text-gray-400">Width</span>
            <div className="bg-gray-50 border border-gray-200 p-2 rounded text-sm text-center font-medium dark:bg-gray-700 dark:border-gray-600">{dimensions.widthMm}</div>
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-gray-400">Height</span>
            <div className="bg-gray-50 border border-gray-200 p-2 rounded text-sm text-center font-medium dark:bg-gray-700 dark:border-gray-600">{dimensions.heightMm}</div>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-gray-500">Dimensions (in)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
            <span className="text-xs text-gray-400">Width</span>
            <div className="bg-gray-50 border border-gray-200 p-2 rounded text-sm text-center font-medium dark:bg-gray-700 dark:border-gray-600">{dimensions.widthIn}</div>
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-gray-400">Height</span>
            <div className="bg-gray-50 border border-gray-200 p-2 rounded text-sm text-center font-medium dark:bg-gray-700 dark:border-gray-600">{dimensions.heightIn}</div>
        </div>
      </div>
      
       <h2 className="text-sm font-semibold text-gray-500">With Wood Frame (mm)</h2>
       <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
            <span className="text-xs text-gray-400">Width</span>
            <div className="bg-gray-50 border border-gray-200 p-2 rounded text-sm text-center font-medium dark:bg-gray-700 dark:border-gray-600">{dimensions.widthWw}</div>
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-gray-400">Height</span>
            <div className="bg-gray-50 border border-gray-200 p-2 rounded text-sm text-center font-medium dark:bg-gray-700 dark:border-gray-600">{dimensions.heightWw}</div>
        </div>
      </div>

    </div>
  );
};

export default DimensionConfig;
