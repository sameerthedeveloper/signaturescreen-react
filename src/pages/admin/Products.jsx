import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Products = () => {
    const { seriesList, refreshData } = useData();
    const [editingItem, setEditingItem] = useState(null);

    const handleDelete = async (id) => {
        if(window.confirm("Delete this series?")) {
            try {
                await deleteDoc(doc(db, 'series', id));
                refreshData();
            } catch (e) {
                console.error("Delete failed: ", e);
                alert("Delete failed");
            }
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            label: formData.get('label'),
            value: formData.get('value'),
            cost: parseFloat(formData.get('cost')),
            hPixel: parseInt(formData.get('hPixel')),
            vPixel: parseInt(formData.get('vPixel')),
            panelWidth: parseFloat(formData.get('panelWidth')),
            panelHeight: parseFloat(formData.get('panelHeight')),
        };

        try {
            if (editingItem) {
                await updateDoc(doc(db, 'series', editingItem.id), data);
                setEditingItem(null);
            } else {
                await addDoc(collection(db, 'series'), data);
            }
            e.target.reset();
            refreshData();
        } catch(err) {
            console.error(err);
            alert("Error saving item");
        }
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto space-y-8 pb-20">
            <h1 className="text-3xl font-bold text-gray-800">Products (Series)</h1>
            
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                        {editingItem ? '✎' : '+'}
                    </span>
                    {editingItem ? `Edit Series: ${editingItem.label}` : 'Add New Series'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Series Label</label>
                            <input name="label" defaultValue={editingItem?.label || ''} placeholder="e.g. AS6 Series" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Value/ID</label>
                            <input name="value" defaultValue={editingItem?.value || ''} placeholder="e.g. AS6" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Cost per Panel (excl GST)</label>
                            <input name="cost" type="number" defaultValue={editingItem?.cost || ''} placeholder="25000" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase text-[10px]">H-Pixels</label>
                            <input name="hPixel" type="number" defaultValue={editingItem?.hPixel || ''} placeholder="270" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase text-[10px]">V-Pixels</label>
                            <input name="vPixel" type="number" defaultValue={editingItem?.vPixel || ''} placeholder="480" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase text-[10px]">Panel Width (mm)</label>
                            <input name="panelWidth" type="number" step="0.01" defaultValue={editingItem?.panelWidth || ''} placeholder="600" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase text-[10px]">Panel Height (mm)</label>
                            <input name="panelHeight" type="number" step="0.01" defaultValue={editingItem?.panelHeight || ''} placeholder="337.5" required className="w-full border border-gray-200 p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        {editingItem && (
                            <button 
                                type="button"
                                onClick={() => setEditingItem(null)}
                                className="px-6 py-3 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                        )}
                        <button className="bg-black text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition shadow-lg shadow-gray-200 flex items-center gap-2">
                            <span>{editingItem ? 'Update Series' : 'Add Series'}</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-4 border-b bg-gray-50/50 font-semibold text-gray-500 text-xs uppercase tracking-wider grid grid-cols-12 gap-4">
                     <div className="col-span-4">Name</div>
                     <div className="col-span-3">Value</div>
                     <div className="col-span-3">Resolution & Size</div>
                     <div className="col-span-2 text-right">Actions</div>
                 </div>
                 <div className="divide-y divide-gray-50">
                     {seriesList.map(item => (
                         <div key={item.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-blue-50/50 transition duration-150 group">
                              <div className="col-span-4 font-medium text-gray-900">
                                {item.label}
                              </div>
                              <div className="col-span-3 text-sm text-gray-500 font-mono">{item.value}</div>
                              <div className="col-span-3 text-xs text-gray-500 space-y-1">
                                <div className="font-semibold text-gray-700">{item.vPixel} x {item.hPixel} px</div>
                                <div className="text-[10px]">{item.panelWidth}mm x {item.panelHeight}mm</div>
                              </div>
                              <div className="col-span-2 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => handleEdit(item)} 
                                    className="text-blue-500 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded text-xs font-bold"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(item.id)} 
                                    className="text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded text-xs font-bold"
                                  >
                                    Delete
                                  </button>
                              </div>
                         </div>
                     ))}
                     {seriesList.length === 0 && <div className="p-12 text-center text-gray-400 italic">No items found in database.</div>}
                 </div>
            </div>
        </div>
    );
};


export default Products;
