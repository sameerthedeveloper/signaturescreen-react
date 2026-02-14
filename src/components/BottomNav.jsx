import React from 'react';
import { Home, FileText } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full fixed bottom-0 bg-white shadow-lg border-t border-gray-200 z-50 dark:bg-gray-700 lg:hidden text-gray-500">
      <div className="flex justify-around items-center py-3">
        
        {/* Home Tab */}
        <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center cursor-pointer ${activeTab === 'home' ? 'text-black dark:text-white' : 'hover:text-black dark:hover:text-white'}`}
        >
            <Home size={20} />
            <span className="text-sm">Main</span>
        </button>

        {/* Invoices Tab */}
        <button 
            onClick={() => setActiveTab('invoice')}
            className={`flex flex-col items-center cursor-pointer ${activeTab === 'invoice' ? 'text-black dark:text-white' : 'hover:text-black dark:hover:text-white'}`}
        >
             <FileText size={20} />
             <span className="text-sm">Invoice</span>
        </button>

      </div>
    </div>
  );
};

export default BottomNav;
