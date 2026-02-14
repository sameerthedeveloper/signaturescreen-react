import React from 'react';

const PixelConfig = ({ hPixels, vPixels, totalPixels }) => {
  return (
    <div className="flex flex-col m-4 bg-white p-6 gap-4 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-gray-700 font-bold dark:text-white">Pixel Configuration</h1>

      <div className="flex items-center gap-4">
        <div className="flex-1">
             <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm text-center font-medium text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {vPixels}
             </div>
        </div>
        <div className="text-gray-400 font-bold">x</div>
        <div className="flex-1">
             <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm text-center font-medium text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {hPixels}
             </div>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex justify-between items-center dark:bg-gray-700 dark:border-gray-600">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Pixels</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">{totalPixels}</span>
      </div>
    </div>
  );
};

export default PixelConfig;
