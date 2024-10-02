import React, { useState } from 'react';

const SetBudgetPage = ({ setBudgetLimit, budgetLimits, updateBudgetLimit, deleteBudgetLimit }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // Index of the budget limit being edited

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetLimit = {
      category,
      amount: Number(amount),
      date,
    };

    if (editingIndex !== null) {
      // Update the existing budget limit
      updateBudgetLimit(editingIndex, budgetLimit);
      setEditingIndex(null); // Reset editing index
    } else {
      // Add a new budget limit
      setBudgetLimit(budgetLimit);
    }
    
    clearFields();
  };

  const clearFields = () => {
    setCategory('');
    setAmount('');
    setDate('');
  };

  const handleEdit = (index) => {
    const limitToEdit = budgetLimits[index];
    setCategory(limitToEdit.category);
    setAmount(limitToEdit.amount);
    setDate(limitToEdit.date);
    setEditingIndex(index); // Set the index of the budget limit being edited
  };

  return (
    <div className="set-budget-container">
      <h1>Set Budget Limit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget limit"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">{editingIndex !== null ? 'Update Budget' : 'Set Budget'}</button>
      </form>

      <h2>Set Budget Limits</h2>
      {budgetLimits.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date Set</th>
              <th>Actions</th> {/* New Actions Column */}
            </tr>
          </thead>
          <tbody>
            {budgetLimits.map((limit, index) => (
              <tr key={index}>
                <td>{limit.category}</td>
                <td>${limit.amount}</td>
                <td>{limit.date}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Update</button>
                  <button onClick={() => deleteBudgetLimit(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No budget limits set.</p>
      )}
    </div>
  );
};

export default SetBudgetPage;
