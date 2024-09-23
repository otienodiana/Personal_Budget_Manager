// src/components/BudgetAlert.js
import React from 'react';

const BudgetAlert = ({ expenses, budgetLimits }) => {
  const totalExpensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <div className="budget-alert">
      <h2>Budget Alerts</h2>
      {Object.keys(budgetLimits).map((category) => {
        const totalSpent = totalExpensesByCategory[category] || 0;
        const limit = budgetLimits[category];

        if (totalSpent >= limit * 0.8) {
          return (
            <div key={category} className="alert">
              Warning: You have spent ${totalSpent} out of your ${limit} limit for {category}.
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default BudgetAlert;
