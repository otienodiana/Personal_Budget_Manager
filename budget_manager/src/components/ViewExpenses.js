// src/components/ViewExpenses.js
import React, { useState } from 'react';
import './ViewExpenses.css'; // Ensure this is correctly imported

const ViewExpenses = ({ expenses }) => {
  const [filter, setFilter] = useState({ category: '', date: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = filter.category === '' || expense.category === filter.category;
    const matchesDate = filter.date === '' || expense.date === filter.date;
    return matchesCategory && matchesDate;
  });

  return (
    <div className="view-expenses">
      <h2>View Expenses</h2>
      <div className="filter-container">
        <input
          type="text"
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          placeholder="Filter by Category"
          className="filter-input"
        />
        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>
      <ul className="expenses-list">
        {filteredExpenses.map((expense, index) => (
          <li key={index} className="expense-item">
            <span className="expense-category">{expense.category}</span> - 
            <span className="expense-amount">${expense.amount}</span> on 
            <span className="expense-date">{expense.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewExpenses;
