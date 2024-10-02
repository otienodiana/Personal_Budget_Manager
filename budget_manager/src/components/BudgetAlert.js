// src/components/BudgetAlert.js
import React from 'react';

const BudgetAlert = ({ expenses, budgetLimits }) => {
    // Calculate total expenses grouped by category
    const totalExpensesByCategory = expenses.reduce((acc, expense) => {
        // Initialize the category if it doesn't exist
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    // Determine which budget limits have been exceeded
    const exceededLimits = budgetLimits.filter(limit => {
        const totalExpenseForCategory = totalExpensesByCategory[limit.category] || 0;
        return totalExpenseForCategory > limit.amount; // Check if expenses exceed the limit
    });

    // Debugging logs for tracking values
    console.log("Total Expenses by Category:", totalExpensesByCategory);
    console.log("Budget Limits:", budgetLimits);
    console.log("Exceeded Limits:", exceededLimits);

    return (
        <div>
            <h2>Budget Alert</h2>
            {exceededLimits.length > 0 ? (
                <div style={{ color: 'red' }}>
                    <p>Alert: You have exceeded your budget limit!</p>
                    <ul>
                        {exceededLimits.map((limit, index) => (
                            <li key={index}>
                                {`Category: ${limit.category}, Limit: $${limit.amount}, Expenses: $${totalExpensesByCategory[limit.category]}`}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Total Expenses: ${Object.values(totalExpensesByCategory).reduce((a, b) => a + b, 0)}</p>
            )}
        </div>
    );
};

// Default props for better handling of missing props
BudgetAlert.defaultProps = {
    budgetLimits: [],
};

export default BudgetAlert;
