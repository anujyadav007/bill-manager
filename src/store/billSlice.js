import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bills: [
    {
      id: 1,
      description: "Dominoes",
      category: "FoodNDining",
      amount: "430",
      date: "01-02-2020"
    },
    {
      id: 2,
      description: "Car wash",
      category: "utility",
      amount: "500",
      date: "01-06-2020"
    },
    {
      id: 3,
      description: "Amazon",
      category: "shopping",
      amount: "2030",
      date: "01-07-2020"
    },
    {
      id: 4,
      description: "House rent",
      category: "Food & Dining",
      amount: "35900",
      date: "01-03-2020"
    },
    {
      id: 5,
      description: "Tuition",
      category: "education",
      amount: "2200",
      date: "01-12-2020"
    },
    {
      id: 6,
      description: "Laundry",
      category: "Personal Care",
      amount: "320",
      date: "02-12-2021"
    },
    {
      id: 7,
      description: "Vacation",
      category: "Travel",
      amount: "3430",
      date: "01-12-2021"
    }
  ],
  filteredBills: [],
  selectedCategory: 'all',
  monthlyBudget: 50000,
  optimizedBills: []
};

const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
      state.filteredBills = state.selectedCategory === 'all' 
        ? state.bills 
        : state.bills.filter(bill => bill.category === state.selectedCategory);
    },
    editBill: (state, action) => {
      const index = state.bills.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
        state.filteredBills = state.selectedCategory === 'all' 
          ? state.bills 
          : state.bills.filter(bill => bill.category === state.selectedCategory);
      }
    },
    removeBill: (state, action) => {
      state.bills = state.bills.filter(bill => bill.id !== action.payload);
      state.filteredBills = state.selectedCategory === 'all' 
        ? state.bills 
        : state.bills.filter(bill => bill.category === state.selectedCategory);
    },
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredBills = action.payload === 'all' 
        ? state.bills 
        : state.bills.filter(bill => bill.category === action.payload);
    },
    setOptimizedBills: (state, action) => {
      state.optimizedBills = action.payload;
    },
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    initializeFilteredBills: (state) => {
      // Ensures filteredBills is initialized correctly on app start
      state.filteredBills = state.selectedCategory === 'all' 
        ? state.bills 
        : state.bills.filter(bill => bill.category === state.selectedCategory);
    }
  }
});

export const { 
  addBill, 
  editBill, 
  removeBill, 
  filterByCategory, 
  setOptimizedBills, 
  setMonthlyBudget, 
  initializeFilteredBills 
} = billSlice.actions;

export default billSlice.reducer;
