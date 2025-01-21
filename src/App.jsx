import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import BillForm from './components/BillForm';
import BillList from './components/BillList';
import BillChart from './components/BillChart';
import BudgetOptimizer from './components/BudgetOptimizer';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center">
             Bill Tracker
          </h1>
          <div className="space-y-6">
            <BillForm />
            <BudgetOptimizer />
            <BillList />
            <BillChart />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
