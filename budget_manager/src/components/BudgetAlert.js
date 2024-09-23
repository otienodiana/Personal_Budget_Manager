// src/components/BudgetAlert.js
import React from 'react';

const BudgetAlert = ({ expenses }) => {
  const categoryLimits = {
    food: 100,
    entertainment: 50,
    transport: 75,
  };

  const alerts = Object.keys(categoryLimits).map(category => {
    const total = expenses.filter(exp => exp.category === category).reduce((acc, curr) => acc + curr.amount, 0);
    if (total > categoryLimits[category]) {
      return <div key={category}>Warning: You have exceeded the budget for {category}!</div>;
    }
    return null;
  });

  return (
    <div>
      {alerts}
    </div>
  );
};

export default BudgetAlert;
