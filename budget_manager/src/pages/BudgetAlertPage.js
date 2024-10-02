// src/pages/BudgetAlertPage.js
import React from 'react';
import BudgetAlert from '../components/BudgetAlert';

const BudgetAlertPage = ({ expenses, budgetLimits }) => {
  return (
    <div>
      <h1>Budget Alert Page</h1>
      <BudgetAlert expenses={expenses} budgetLimits={budgetLimits} />
    </div>
  );
};

export default BudgetAlertPage;
