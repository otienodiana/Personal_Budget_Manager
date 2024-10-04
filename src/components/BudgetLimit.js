import React, { useState } from 'react';

const BudgetLimit = ({ setBudgetLimit, currentLimit, budgetLimits }) => {
  const [limit, setLimit] = useState(0);
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'category') {
      setCategory(e.target.value);
    } else {
      setLimit(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudgetLimit({ category, amount: limit });
    setLimit(0); // Clear input after setting limit
    setCategory(''); // Clear category after setting limit
  };

  return (
    <div className="budget-limit-container">
      <h2>Set Budget Limit</h2>
      <form className="budget-limit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          value={category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          value={limit}
          onChange={handleChange}
          placeholder="Set your budget limit"
          required
        />
        <button type="submit">Set Limit</button>
      </form>

      <div className="current-limits">
        <h3>Current Budget Limits:</h3>
        {budgetLimits && Object.entries(budgetLimits).length > 0 ? (
          <ul>
            {Object.entries(budgetLimits).map(([cat, lim]) => (
              <li key={cat}>
                {cat}: ${lim}
              </li>
            ))}
          </ul>
        ) : (
          <p>No limits set.</p>
        )}
      </div>
    </div>
  );
};

export default BudgetLimit;
