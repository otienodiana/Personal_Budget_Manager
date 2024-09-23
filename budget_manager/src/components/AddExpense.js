// src/components/AddExpense.js
import React, { useState } from 'react';

const AddExpense = ({ addExpense }) => {
  const [expense, setExpense] = useState({ category: '', amount: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(expense);
    setExpense({ category: '', amount: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="category"
        value={expense.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        placeholder="Amount"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
