import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Edit } from 'lucide-react';
import { removeBill, editBill, filterByCategory, initializeFilteredBills } from '../store/billSlice';

const BillList = () => {
  const dispatch = useDispatch();
  const { filteredBills, selectedCategory, optimizedBills } = useSelector((state) => state.bills);

  const categories = ['all', ...new Set(filteredBills.map((bill) => bill.category))];

  const [editingBill, setEditingBill] = useState(null);
  const [editForm, setEditForm] = useState({
    id: '',
    description: '',
    category: '',
    amount: '',
    date: '',
  });

  const isOptimized = (billId) => optimizedBills.includes(billId);

  useEffect(() => {
    dispatch(initializeFilteredBills());
  }, [dispatch]);

  const handleEditClick = (bill) => {
    setEditingBill(bill.id);
    setEditForm(bill);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (editingBill !== null) {
      dispatch(editBill(editForm));
      setEditingBill(null);
      setEditForm({
        id: '',
        description: '',
        category: '',
        amount: '',
        date: '',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingBill(null);
    setEditForm({
      id: '',
      description: '',
      category: '',
      amount: '',
      date: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-indigo-900">Bills</h2>
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(filterByCategory(e.target.value))}
          className="rounded-lg border-purple-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-indigo-700"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-purple-200">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {filteredBills.map((bill) => (
                <tr
                  key={bill.id}
                  className={`${
                    isOptimized(bill.id)
                      ? 'bg-green-100 border-l-4 border-green-500 shadow-md'
                      : 'hover:bg-indigo-50'
                  } transition-colors duration-150`}
                >
                  {editingBill === bill.id ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          name="description"
                          value={editForm.description}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          name="category"
                          value={editForm.category}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          name="amount"
                          value={editForm.amount}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="date"
                          name="date"
                          value={editForm.date}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-900"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-900">
                        {bill.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-900">
                        {bill.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-900">
                        ₹{bill.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-900">
                        {bill.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEditClick(bill)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => dispatch(removeBill(bill.id))}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillList;
