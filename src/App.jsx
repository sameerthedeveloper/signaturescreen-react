import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import MainPage from './pages/MainPage';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Processors from './pages/admin/Processors';
import SiteControl from './pages/admin/SiteControl';

function App() {
  return (
    <DataProvider>
      <Router basename="/signaturescreen-react">
        <Routes>
          <Route path="/" element={<MainPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<Dashboard />} />
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="products" element={<Products />} />
             <Route path="installations" element={<Categories />} />
             <Route path="processors" element={<Processors />} />
             <Route path="site-control" element={<SiteControl />} />
             <Route path="*" element={<div className="p-10 text-center text-gray-500">Page under construction</div>} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
