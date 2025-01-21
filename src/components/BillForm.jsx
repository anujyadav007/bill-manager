import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import { addBill } from '../store/billSlice';

const BillForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBill = {
      id: Date.now(),
      ...formData
    };
    dispatch(addBill(newBill));
    setFormData({ description: '', category: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
      <h2 className="text-2xl font-semibold text-indigo-900 mb-6">Add New Bill</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-2">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:font-bold"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-2">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Enter category"
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:font-bold"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-2">Amount (₹)</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount"
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:font-bold"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Add Bill
      </button>
    </form>
  );
};

export default BillForm;
