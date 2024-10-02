// src/components/ExpenseSummary.js
import React from 'react';
import ChartComponent from './ChartComponent';

const ExpenseSummary = ({ expenses }) => {
  const labels = expenses.map(expense => expense.category);
  const data = expenses.map(expense => expense.amount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses',
        data: data,
        // ... (rest of your chart data configuration)
      },
    ],
  };

  return (
    <div>
      <h2>Expense Summary</h2>
      <div className="chart-container">
        <ChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseSummary;
