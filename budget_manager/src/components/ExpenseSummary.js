// src/components/ExpenseSummary.js
import React from 'react';
import ChartComponent from './ChartComponent';

const ExpenseSummary = ({ expenses }) => {
  // Example transformation of expenses data to chart data format
  const labels = expenses.map(expense => expense.category);
  const data = expenses.map(expense => expense.amount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Expense Summary</h2>
      <ChartComponent data={chartData} />
    </div>
  );
};

export default ExpenseSummary;
