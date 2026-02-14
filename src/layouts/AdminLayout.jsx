import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LogOut, LayoutDashboard, Package, ArrowLeft, Settings, LayoutGrid, Menu, X, Cpu } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import clsx from 'clsx';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Series", path: "/admin/products", icon: Package }, // Series
    { label: "Processors", path: "/admin/processors", icon: Cpu }, // Added Processors
    { label: "Installations", path: "/admin/installations", icon: LayoutGrid }, // Installations
    { label: "Site Control", path: "/admin/site-control", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans text-gray-800">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
         <div className="flex items-center gap-3">
             {/* <img src={logo} alt="Cinema Focus" className="h-6 w-auto" /> */}
             <h1 className='font-bold font-stretch-ultra-condensed text-2xl'>Signature Screens</h1>
         </div>
         <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg">
             <Menu size={24} />
         </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={clsx(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen shadow-2xl md:shadow-none",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-3">
             {/* <img src={logo} alt="Cinema Focus Admin" className="h-6 w-auto" /> */}
             <h1 className='font-bold font-stretch-ultra-condensed text-3xl'>Signature Screens</h1>
           </div>
           {/* Close text/icon for mobile only */}
           <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-500 hover:text-gray-900">
             <X size={20} />
           </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-black text-white shadow-md shadow-gray-400/20" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
           <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
             <ArrowLeft size={18} />
             Back to Site
           </Link>
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
           >
             <LogOut size={18} />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50/50 h-[calc(100vh-64px)] md:h-screen overflow-y-auto w-full p-4 md:p-10 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300">
        <div className="max-w-7xl mx-auto">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
