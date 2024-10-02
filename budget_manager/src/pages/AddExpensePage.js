// src/pages/AddExpensePage.js
import React, { useState } from 'react';

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Health',
  'Housing',
  'Insurance',
  'Education',
  'Savings',
  'Other'
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AddExpensePage = ({ addExpense, expenses, updateExpense, deleteExpense }) => {
  const [category, setCategory] = useState(categories[0]); // Default to the first category
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month

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

    setCategory(categories[0]); // Reset to the first category after submission
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

  // Function to filter expenses by the selected month
  const getExpensesByMonth = (month) => {
    const currentYear = new Date().getFullYear();
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === month;
    });
  };

  const filteredExpenses = getExpensesByMonth(selectedMonth);

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
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
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

      {/* Dropdown to select month */}
      <div className="month-selection">
        <label>Select Month:</label>
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(Number(e.target.value))} // Convert string to number
          className="month-dropdown"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
      </div>

      <h3>{months[selectedMonth]} Expenses:</h3>
      <ul className="expense-list">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense, index) => (
            <li key={index} className="expense-item">
              {expense.category}: ${expense.amount.toFixed(2)} on {new Date(expense.date).toLocaleDateString()}
              <div className="expense-actions">
                <button onClick={() => handleEdit(expenses.indexOf(expense))} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(expenses.indexOf(expense))} className="delete-button">Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-expenses">No expenses added for {months[selectedMonth]}.</p>
        )}
      </ul>
    </div>
  );
};

export default AddExpensePage;
