import React, { useState } from 'react';

const SetBudgetPage = ({ setBudgetLimit, budgetLimits, updateBudgetLimit, deleteBudgetLimit }) => {
    const [budget, setBudget] = useState({ category: '', amount: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBudget((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBudgetLimit(budget);
        setBudget({ category: '', amount: '' });
    };

    return (
        <div>
            <h2>Set Budget</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={budget.category}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={budget.amount}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Set Budget</button>
            </form>
            <div>
                <h3>Current Budget Limits</h3>
                <ul>
                    {budgetLimits.map((limit, index) => (
                        <li key={index}>
                            {limit.category}: ${limit.amount}
                            <button onClick={() => deleteBudgetLimit(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SetBudgetPage;
