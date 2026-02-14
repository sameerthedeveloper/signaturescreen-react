import React from 'react';

const FinalCost = ({ grandTotalExclGst, grandTotalInclGst }) => {
  return (
    <div className="flex flex-col m-4 bg-white p-6 gap-4 rounded-2xl shadow-sm border border-gray-100 mb-20 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-gray-700 font-bold dark:text-white">Final Estimated Cost</h1>

      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total (excl. GST)</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">₹ {grandTotalExclGst}</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
            <span className="text-base font-bold text-blue-800 dark:text-blue-300">Grand Total (incl. GST)</span>
            <span className="text-lg font-extrabold text-blue-700 dark:text-blue-400">₹ {grandTotalInclGst}</span>
        </div>
      </div>
    </div>
  );
};

export default FinalCost;
