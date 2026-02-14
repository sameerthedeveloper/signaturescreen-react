import React from 'react';
import { ChevronDown } from 'lucide-react';

const SeriesConfig = ({ value, onChange, seriesList }) => {
  return (
    <div className="flex flex-col m-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-gray-700 font-bold mb-4 dark:text-white">Home Theatre Channel</h1>
      <div className="relative">
         <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 appearance-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            id="series"
         >
             <option disabled value="">Select Home Theatre Channel</option>
            {seriesList.map((series) => (
              <option key={series.value} value={series.value}>
                {series.label}
              </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
             <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default SeriesConfig;
