// src/components/WeeklySpendingTracker.js
import React from 'react';

const WeeklySpendingTracker = ({ expenses }) => {
  const getWeeklyExpenses = (expenses) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start from Monday
    const weekExpenses = {};

    // Initialize week days
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(currentDay.getDate() + i);
      weekExpenses[currentDay.toLocaleDateString()] = { date: currentDay, amount: 0, categories: {} };
    }

    // Aggregate expenses for the week
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseKey = expenseDate.toLocaleDateString();
      if (weekExpenses[expenseKey]) {
        weekExpenses[expenseKey].amount += expense.amount;
        weekExpenses[expenseKey].categories[expense.category] = 
          (weekExpenses[expenseKey].categories[expense.category] || 0) + expense.amount;
      }
    });

    return weekExpenses;
  };

  const weeklyExpenses = getWeeklyExpenses(expenses);

  return (
    <div className="weekly-spending-tracker">
      <h2>Weekly Spending Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(weeklyExpenses).map(([key, value]) => (
            <tr key={key}>
              <td>{value.date.toLocaleDateString()}</td>
              <td>${value.amount.toFixed(2)}</td>
              <td>
                {Object.entries(value.categories).map(([category, amount]) => (
                  <div key={category}>
                    {category}: ${amount.toFixed(2)}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Object.values(weeklyExpenses).every(day => day.amount === 0) && (
        <p>No expenses recorded this week.</p>
      )}
    </div>
  );
};

export default WeeklySpendingTracker;
