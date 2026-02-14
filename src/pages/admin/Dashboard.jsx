import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Package, Cpu, Layers, Users } from 'lucide-react';

const Dashboard = () => {
  const { seriesList, processorList, installOptions } = useData();

  const stats = {
      seriesCount: seriesList.length,
      processorCount: processorList.length,
      installCount: installOptions.length
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Overview of your store performance.</p>
         </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
             <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Products</span>
             <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Package size={20} /></span>
          </div>
          <div className="text-4xl font-bold text-gray-800">{stats.seriesCount}</div>
        </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
             <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Components</span>
             <span className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Cpu size={20} /></span>
          </div>
          <div className="text-4xl font-bold text-gray-800">{stats.processorCount}</div>
        </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
             <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Categories</span>
             <span className="p-2 bg-green-50 text-green-600 rounded-lg"><Layers size={20} /></span>
          </div>
          <div className="text-4xl font-bold text-gray-800">{stats.installCount}</div>
        </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
               <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Users</span>
               <span className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Users size={20} /></span>
            </div>
            <div className="text-4xl font-bold text-gray-800">1</div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Site Activity */}
          <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-10">
                  <h2 className="text-lg font-bold text-gray-800">Site Activity (Last 7 Days)</h2>
                  <span className="text-xs bg-gray-50 text-gray-400 px-2 py-1 rounded">Real-time Visits</span>
              </div>
              <div className="flex-1 flex items-center justify-center text-gray-300 text-sm italic">
                  Loading analytics...
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
