import React from 'react';
import { useData } from '../../contexts/DataContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';

const Categories = () => {
    const { installOptions, refreshData } = useData();

    const handleDelete = async (id) => {
        if(window.confirm("Delete this category?")) {
            try {
                await deleteDoc(doc(db, 'installations', id));
                refreshData();
            } catch (e) {
                console.error("Delete failed: ", e);
                alert("Delete failed");
            }
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            label: formData.get('label'),
            value: formData.get('value'),
            cost: parseFloat(formData.get('cost')),
            gst: parseFloat(formData.get('gst'))
        };

        try {
            await addDoc(collection(db, 'installations'), data);
            e.target.reset();
            refreshData();
        } catch(err) {
            console.error(err);
            alert("Error adding item");
        }
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Categories (Installation Options)</h1>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">+</span>
                    Add Category
                </h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                     <div className="lg:col-span-3">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Label</label>
                        <input name="label" placeholder="e.g. Standard Install" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                     </div>
                     <div className="lg:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Value/ID</label>
                        <input name="value" placeholder="e.g. std_install" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                     </div>
                     <div className="lg:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Cost</label>
                        <input name="cost" type="number" placeholder="Cost" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                     </div>
                     <div className="lg:col-span-4 lg:col-start-8">
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Total (Incl GST)</label>
                        <input name="gst" type="number" placeholder="Total Cost" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                    </div>
                     
                     <div className="lg:col-span-1">
                        <button className="w-full bg-black text-white p-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition shadow-lg shadow-gray-200">Add</button>
                     </div>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-4 border-b bg-gray-50/50 font-semibold text-gray-500 text-xs uppercase tracking-wider grid grid-cols-12 gap-4">
                     <div className="col-span-4">Name</div>
                     <div className="col-span-3">Value</div>
                     <div className="col-span-3">Cost</div>
                     <div className="col-span-2 text-right">Actions</div>
                 </div>
                 <div className="divide-y divide-gray-50">
                     {installOptions.map(item => (
                         <div key={item.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-blue-50/50 transition duration-150 group">
                              <div className="col-span-4 font-medium text-gray-900">{item.label || item.value}</div>
                              <div className="col-span-3 text-sm text-gray-500 font-mono">{item.value}</div>
                              <div className="col-span-3 text-sm font-medium text-gray-700">₹{item.cost?.toLocaleString()}</div>
                              <div className="col-span-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded text-xs font-bold">Delete</button>
                              </div>
                         </div>
                     ))}
                     {installOptions.length === 0 && <div className="p-12 text-center text-gray-400 italic">No items found in database.</div>}
                 </div>
            </div>
        </div>
    );
};

export default Categories;
