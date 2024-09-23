// src/components/ViewExpenses.js
import React from 'react';

const ViewExpenses = ({ expenses }) => {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.date} - {expense.category}: ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewExpenses;
