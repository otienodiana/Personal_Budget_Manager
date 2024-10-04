// src/components/BudgetAlert.js
import React from 'react';

const BudgetAlert = ({ budgetLimits, expenses }) => {
    const totalExpenses = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
    const budgetExceeded = budgetLimits.some(limit => totalExpenses > limit);

    return (
        <div>
            {budgetExceeded && (
                <div className="alert alert-warning">
                    Warning: You have exceeded your budget limit!
                </div>
            )}
            {totalExpenses === 0 && budgetLimits.length > 0 && (
                <div className="alert alert-info">
                    You have not made any expenses yet.
                </div>
            )}
        </div>
    );
};

export default BudgetAlert;
