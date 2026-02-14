import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Database, RefreshCw, Upload, Monitor } from 'lucide-react';

const SiteControl = () => {
  const { refreshData, uploadSeedData, siteTheme, updateTheme } = useData();

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Site Control</h1>
        <p className="text-gray-500">Manage system-wide settings and data.</p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Monitor size={24} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-gray-800">Site Appearance</h2>
                <p className="text-sm text-gray-500">Customize the look and feel of the main application.</p>
             </div>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                <div>
                   <h3 className="font-bold text-gray-900 mb-1">Theme Selection</h3>
                   <p className="text-sm text-gray-500 max-w-md">
                      Switch between the classic default design and the modern professional theme.
                   </p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => updateTheme('default')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${siteTheme === 'default' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Default
                    </button>
                    <button 
                        onClick={() => updateTheme('professional')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${siteTheme === 'professional' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Professional
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Database size={24} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-gray-800">Database Management</h2>
                <p className="text-sm text-gray-500">Control your Firestore data state.</p>
             </div>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                <div>
                   <h3 className="font-bold text-gray-900 mb-1">Upload Default Seed Data</h3>
                   <p className="text-sm text-gray-500 max-w-md">
                      This will reset your database collections (Series, Processors, Installations) to the default values defined in `seed.json`.
                      <br/>
                      <span className="text-red-500 font-medium">Warning: Existing data may be duplicated or overwritten depending on ID conflicts.</span>
                   </p>
                </div>
                <button 
                    onClick={() => {
                        if(window.confirm('Are you sure you want to upload seed data?')) {
                            uploadSeedData();
                        }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 hover:text-black hover:border-gray-300 transition shadow-sm whitespace-nowrap"
                >
                    <Upload size={18} />
                    Upload Defaults
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                <div>
                   <h3 className="font-bold text-gray-900 mb-1">Sync / Refresh Data</h3>
                   <p className="text-sm text-gray-500 max-w-md">
                      Force a refresh of the local application state from Firestore. Use this if you made changes that aren't appearing immediately.
                   </p>
                </div>
                <button 
                    onClick={refreshData}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 whitespace-nowrap"
                >
                    <RefreshCw size={18} />
                    Sync Data
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SiteControl;
