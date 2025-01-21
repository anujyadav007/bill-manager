// Bill type is represented as an object structure, but no explicit type annotations
const Bill = {
    id: 0,
    description: '',
    category: '',
    amount: '',
    date: ''
  };
  
  const initialState = {
    bills: [
      // Example bill objects
      {
        id: 1,
        description: "Dominoes",
        category: "FoodNDining",
        amount: "430",
        date: "01-02-2020"
      },
      // Add more bill objects as needed
    ],
    filteredBills: [],
    selectedCategory: 'all',
    monthlyBudget: 50000,
    optimizedBills: []
  };
  
  export default initialState;
  