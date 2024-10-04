import React from 'react';

const BudgetAlert = ({ budgetLimits, expenses }) => {
    // Calculate total expenses per category
    const totalExpensesByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
        return acc;
    }, {});

    // Create an array of alerts for each category that exceeds the budget limit
    const alerts = budgetLimits.map(limit => {
        const categoryExpenses = totalExpensesByCategory[limit.category] || 0;
        if (categoryExpenses > limit.amount) {
            return `Warning: You have exceeded your budget limit for ${limit.category} by $${(categoryExpenses - limit.amount).toFixed(2)}!`;
        }
        return null; // No alert for this category
    }).filter(alert => alert !== null); // Filter out null alerts

    return (
        <div>
            {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                    <div key={index} className="alert alert-warning">
                        {alert}
                    </div>
                ))
            ) : (
                totalExpensesByCategory.length === 0 && budgetLimits.length > 0 && (
                    <div className="alert alert-info">
                        You have not made any expenses yet.
                    </div>
                )
            )}
        </div>
    );
};

export default BudgetAlert;
