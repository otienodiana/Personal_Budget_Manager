import React, { useState } from 'react';
import './BudgetLimit.css';

const BudgetLimit = ({ setBudgetLimit }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudgetLimit({ category, amount: parseFloat(amount) });
    setCategory('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="budget-limit-form">
      <h2>Set Budget Limit</h2>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Set Limit</button>
    </form>
  );
};

export default BudgetLimit;
