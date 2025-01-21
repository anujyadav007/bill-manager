import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthlyBudget, setOptimizedBills } from '../store/billSlice';
import { findOptimalBills } from '../utils/optimizeBills';
import { Calculator } from 'lucide-react';
import RupeeIcon from './icons/RupeeIcon';

const BudgetOptimizer = () => {
  const dispatch = useDispatch();
  const { bills, monthlyBudget, optimizedBills } = useSelector((state) => state.bills);
  const [budget, setBudget] = useState(monthlyBudget.toString());

  const totalBillsAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
  const optimizedAmount = optimizedBills.length > 0 
    ? bills
        .filter(bill => optimizedBills.includes(bill.id))
        .reduce((sum, bill) => sum + parseFloat(bill.amount), 0)
    : 0;

  const handleOptimize = () => {
    const budgetValue = parseFloat(budget);
    if (!isNaN(budgetValue)) {
      dispatch(setMonthlyBudget(budgetValue));
      const optimizedBillIds = findOptimalBills(bills, budgetValue);
      dispatch(setOptimizedBills(optimizedBillIds));
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-100">
      <h2 className="text-2xl font-semibold text-teal-900 mb-6">Budget Optimizer</h2>
      <div className="grid gap-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-teal-700 mb-2">
              Monthly Budget (₹)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="block w-full rounded-lg border-teal-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <button
            onClick={handleOptimize}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center transition-all duration-200"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Optimize Bills
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-lg border border-teal-100">
            <div className="flex items-center gap-2 text-teal-800 mb-2">
              <RupeeIcon />
              <h3 className="font-semibold">Optimized Amount</h3>
            </div>
            <p className="text-2xl font-bold text-teal-900">
              ₹{optimizedAmount.toLocaleString()}
              <span className="text-sm font-normal text-teal-600 ml-2">
                out of ₹{parseFloat(budget).toLocaleString()}
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-lg border border-teal-100">
            <div className="flex items-center gap-2 text-teal-800 mb-2">
              <RupeeIcon />
              <h3 className="font-semibold">Total Bills Amount</h3>
            </div>
            <p className="text-2xl font-bold text-teal-900">
              ₹{totalBillsAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOptimizer;
