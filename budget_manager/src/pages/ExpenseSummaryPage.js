// src/pages/ExpenseSummaryPage.js
import React from 'react';
import ExpenseSummary from '../components/ExpenseSummary';

const ExpenseSummaryPage = ({ expenses }) => {
  return (
    <div>
      
      <ExpenseSummary expenses={expenses} />
    </div>
  );
};

export default ExpenseSummaryPage;
