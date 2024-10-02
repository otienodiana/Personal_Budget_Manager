import React, { useEffect, useState, useCallback } from 'react';

const BudgetAlert = ({ expenses, budgetLimits }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const storedAlerts = JSON.parse(localStorage.getItem('budgetAlerts')) || [];
    setAlerts(storedAlerts);
  }, []);

  // Function to check for budget alerts based on expenses and limits
  const checkBudgetAlerts = useCallback(() => {
    const newAlerts = [];

    budgetLimits.forEach((limit) => {
      const totalExpenses = expenses
        .filter((expense) => expense.category === limit.category)
        .reduce((acc, expense) => acc + expense.amount, 0);

      if (totalExpenses > limit.amount) {
        newAlerts.push(`You have exceeded the budget limit for ${limit.category}!`);
      } else if (totalExpenses === limit.amount) {
        newAlerts.push(`You have reached the budget limit for ${limit.category}.`);
      }
    });

    return newAlerts;
  }, [expenses, budgetLimits]); // Include dependencies

  // Check alerts and update state when expenses or budget limits change
  useEffect(() => {
    const newAlerts = checkBudgetAlerts();
    setAlerts(newAlerts);
    localStorage.setItem('budgetAlerts', JSON.stringify(newAlerts));
  }, [checkBudgetAlerts]); // Now safe to include only checkBudgetAlerts

  const clearAlert = (index) => {
    const updatedAlerts = alerts.filter((_, i) => i !== index);
    setAlerts(updatedAlerts);
    localStorage.setItem('budgetAlerts', JSON.stringify(updatedAlerts));
  };

  return (
    <div>
      <h2>Alerts</h2>
      <ul>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <li key={index}>
              {alert}
              <button onClick={() => clearAlert(index)}>Dismiss</button>
            </li>
          ))
        ) : (
          <p>No budget alerts at the moment.</p>
        )}
      </ul>
    </div>
  );
};

export default BudgetAlert;
