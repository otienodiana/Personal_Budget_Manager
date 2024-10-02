// src/pages/ExpenseSummaryPage.js
import React from 'react';
import ExpenseSummary from '../components/ExpenseSummary';

const ExpenseSummaryPage = ({ expenses }) => {
  return (
    <div>
      <h2>Expense Summary Page</h2>
      <ExpenseSummary expenses={expenses} />
    </div>
  );
};

export default ExpenseSummaryPage;
