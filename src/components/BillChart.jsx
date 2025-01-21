import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BillChart = () => {
  const { bills } = useSelector((state) => state.bills);

  const chartData = [...bills]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(bill => ({
      date: bill.date,
      amount: parseFloat(bill.amount)
    }));

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
      <h2 className="text-2xl font-semibold text-indigo-900 mb-6">Monthly Billing Cycle</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              stroke="#4338ca"
              tick={{ fill: '#4338ca' }}
            />
            <YAxis 
              stroke="#4338ca"
              tick={{ fill: '#4338ca' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ fill: '#6366f1', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              name="Bill Amount"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BillChart;
