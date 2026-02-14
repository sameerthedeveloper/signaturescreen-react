import React from 'react';

const CustomerConfig = ({ 
    name, setName, 
    email, setEmail, 
    phone, setPhone, 
    date, setDate 
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-gray-700 font-bold mb-4 dark:text-gray-200">Customer Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Row 1 */}
        <div className="flex flex-col">
            <input 
                type="text" 
                placeholder="Customer Name" 
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="flex flex-col">
            <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col">
            <input 
                type="tel" 
                placeholder="Phone Number" 
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
        </div>
        <div className="flex flex-col">
            <input 
                type="date" 
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </div>
      </div>
    </div>
  );
};

export default CustomerConfig;
