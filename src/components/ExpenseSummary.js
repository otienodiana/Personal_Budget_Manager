// ExpenseSummary.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseSummary = ({ expenses }) => {
    // Sample expenses for testing
    const sampleExpenses = [
        { name: 'Lunch', amount: 15, date: '2024-10-01', category: 'Food' },
        { name: 'Bus Ticket', amount: 3, date: '2024-10-02', category: 'Transportation' },
        { name: 'Electricity Bill', amount: 50, date: '2024-10-03', category: 'Utilities' },
        { name: 'Movie Ticket', amount: 12, date: '2024-10-04', category: 'Entertainment' },
        { name: 'Doctor Visit', amount: 100, date: '2024-10-05', category: 'Health' },
    ];

    // Use sample data if expenses are empty
    const expensesToUse = expenses.length > 0 ? expenses : sampleExpenses;

    const categories = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Health', 'Other'];
    
    // Calculate total amount spent in each category
    const expenseData = categories.map(category => {
        return expensesToUse
            .filter(expense => expense.category === category)
            .reduce((acc, expense) => acc + expense.amount, 0);
    });

    // Prepare data for Pie chart
    const data = {
        labels: categories,
        datasets: [
            {
                data: expenseData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
            },
        ],
    };

    return (
        <div>
            <h2>Expense Summary</h2>
            {expenseData.some(amount => amount > 0) ? (
                <Pie data={data} />
            ) : (
                <p>No expenses to display.</p>
            )}
        </div>
    );
};

export default ExpenseSummary;
