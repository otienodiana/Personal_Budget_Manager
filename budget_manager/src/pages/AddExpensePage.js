import React, { useState } from 'react';

import './AddExpensePage.css';

const AddExpensePage = ({ addExpense, expenses, updateExpense, deleteExpense }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  
  // New state for filtering
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !amount || !date) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense = {
      category,
      amount: parseFloat(amount),
      date,
    };

    if (editingIndex !== null) {
      updateExpense(editingIndex, newExpense);
      setEditingIndex(null);
    } else {
      addExpense(newExpense);
    }

    setCategory('');
    setAmount('');
    setDate('');
  };

  const handleEdit = (index) => {
    const expenseToEdit = expenses[index];
    setCategory(expenseToEdit.category);
    setAmount(expenseToEdit.amount);
    setDate(expenseToEdit.date);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    deleteExpense(index);
  };

  // Function to filter expenses based on category and date
  const filterExpenses = (expenses) => {
    return expenses.filter(expense => {
      const matchesCategory = filterCategory ? expense.category === filterCategory : true;
      const matchesDate = filterDate ? new Date(expense.date).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;
      return matchesCategory && matchesDate;
    });
  };

  const currentMonthExpenses = filterExpenses(expenses).filter(expense => new Date(expense.date).getMonth() === new Date().getMonth());
  const lastMonthExpenses = filterExpenses(expenses).filter(expense => new Date(expense.date).getMonth() === new Date().getMonth() - 1);

  return (
    <div className="container">
      <h2 className="header">{editingIndex !== null ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="input"
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">
          {editingIndex !== null ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      {/* Add the Weekly Spending Tracker component */}
      

      {/* New Filters Section */}
      {/* New Filters Section */}
<div className="filter-section">
  <h3>Filter Expenses:</h3>
  <div className="filter-group">
    <div className="filter-item">
      <label>Filter by Category:</label>
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Health">Health</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div className="filter-item">
      <label>Filter by Date:</label>
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
    </div>
  </div>
</div>


      <h3>Current Month Expenses:</h3>
      <div className="expense-table">
        <div className="table-header">
          <div className="header-item">Category</div>
          <div className="header-item">Amount</div>
          <div className="header-item">Date</div>
          <div className="header-item">Actions</div>
        </div>
        {currentMonthExpenses.length > 0 ? (
          currentMonthExpenses.map((expense, index) => (
            <div key={index} className="table-row">
              <div className="row-item">{expense.category}</div>
              <div className="row-item">${expense.amount.toFixed(2)}</div>
              <div className="row-item">{new Date(expense.date).toLocaleDateString()}</div>
              <div className="row-item">
                <button onClick={() => handleEdit(expenses.indexOf(expense))} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(expenses.indexOf(expense))} className="delete-button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-expenses">No expenses added for this month.</p>
        )}
      </div>

      <h3>Last Month Expenses:</h3>
      <div className="expense-table">
        <div className="table-header">
          <div className="header-item">Category</div>
          <div className="header-item">Amount</div>
          <div className="header-item">Date</div>
          <div className="header-item">Actions</div>
        </div>
        {lastMonthExpenses.length > 0 ? (
          lastMonthExpenses.map((expense, index) => (
            <div key={index} className="table-row">
              <div className="row-item">{expense.category}</div>
              <div className="row-item">${expense.amount.toFixed(2)}</div>
              <div className="row-item">{new Date(expense.date).toLocaleDateString()}</div>
              <div className="row-item">
                <button onClick={() => handleEdit(expenses.indexOf(expense))} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(expenses.indexOf(expense))} className="delete-button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-expenses">No expenses added for last month.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpensePage;
