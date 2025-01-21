export const findOptimalBills = (bills, budget) => {
    const n = bills.length;
    const amounts = bills.map(bill => parseFloat(bill.amount));
    
    // Create a table for dynamic programming
    const dp = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(false));
    
    // Initialize base cases
    for (let i = 0; i <= n; i++) dp[i][0] = true;
    
    // Fill the dp table
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= budget; j++) {
        if (amounts[i - 1] <= j) {
          dp[i][j] = dp[i - 1][j - amounts[i - 1]] || dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    
    // Find the maximum sum that doesn't exceed budget
    let maxSum = 0;
    for (let j = budget; j >= 0; j--) {
      if (dp[n][j]) {
        maxSum = j;
        break;
      }
    }
    
    // Backtrack to find the bills
    const selectedBills = [];
    let currentSum = maxSum;
    let i = n;
    
    while (i > 0 && currentSum > 0) {
      if (i > 0 && dp[i - 1][currentSum]) {
        i--;
      } else {
        selectedBills.push(bills[i - 1].id);
        currentSum -= amounts[i - 1];
        i--;
      }
    }
    
    return selectedBills;
  };
  