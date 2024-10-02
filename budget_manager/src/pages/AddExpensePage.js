import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = ({ addExpense, expenses, updateExpense, deleteExpense }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

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
    navigate('/expense-summary');
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

  return (
    <div className="container">
      <h2 className="header">{editingIndex !== null ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="input"
          />
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

      <h3>Current Expenses:</h3>
      <ul className="expense-list">
        {expenses && expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <li key={index} className="expense-item">
              {expense.category}: ${expense.amount.toFixed(2)} on {new Date(expense.date).toLocaleDateString()}
              <div className="expense-actions">
                <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-expenses">No expenses added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default AddExpensePage;
