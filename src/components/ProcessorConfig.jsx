import React from 'react';
import { ChevronDown } from 'lucide-react';

const ProcessorConfig = ({ 
    processorList, 
    selectedProcessor, 
    setSelectedProcessor, 
    // processorPriceExclGst, 
    processorPriceInclGst, 
    customPrice, 
    setCustomPrice, 
    customName,
    setCustomName,
    includeProcessor, 
    setIncludeProcessor 
}) => {

  return (
    <div className="flex flex-col mb-4 bg-white p-6 gap-4 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
       <div className="flex justify-between items-center">
        <h1 className="text-gray-700 font-bold dark:text-white">Processor Configuration</h1>
         <div className="flex items-center gap-2">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={includeProcessor}
                onChange={(e) => setIncludeProcessor(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
         </div>
      </div>

      {includeProcessor && (
        <div className="flex flex-col gap-4">
             <div className="relative flex-1">
                 <select
                    value={selectedProcessor}
                    onChange={(e) => setSelectedProcessor(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 appearance-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                >
                    <option disabled value="">Select Processor</option>
                    {processorList.map((processor) => (
                    <option key={processor.value} value={processor.value}>
                        {processor.label}
                    </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                     <ChevronDown size={16} />
                </div>
            </div>

            <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500 mb-1">Custom Processor Name</span>
                 <input
                    type="text"
                    placeholder="Enter custom name (overrides selection)"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                     className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 mb-1">Custom Price</span>
                     <input
                        type="number"
                        placeholder="Overwrite"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                         className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                 <div className="flex flex-col justify-end">
                    <div className="bg-gray-100 border border-gray-200 p-2.5 rounded-lg flex justify-between items-center dark:bg-gray-600 dark:border-gray-500">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-300">Total (incl GST)</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">₹ {processorPriceInclGst}</span>
                    </div>
                 </div>
            </div>
            
        </div>
      )}
    </div>
  );
};

export default ProcessorConfig;
