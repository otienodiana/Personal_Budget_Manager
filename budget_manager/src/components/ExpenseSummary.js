// ExpenseSummary.js
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker

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
        { name: 'Groceries', amount: 40, date: '2024-10-07', category: 'Food' },
        { name: 'Gas', amount: 30, date: '2024-10-08', category: 'Transportation' },
    ];

    // Use sample data if expenses are empty
    const expensesToUse = expenses.length > 0 ? expenses : sampleExpenses;

    const categories = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Health', 'Other'];
    
    // State to manage selected start and end dates
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Calculate total amount spent in each category for the selected date range or monthly summary
    const getExpenseData = () => {
        // If dates are selected, calculate for the range
        if (startDate && endDate) {
            return categories.map(category => {
                return expensesToUse
                    .filter(expense => {
                        const expenseDate = new Date(expense.date);
                        return expense.category === category &&
                               expenseDate >= startDate &&
                               expenseDate <= endDate;
                    })
                    .reduce((acc, expense) => acc + expense.amount, 0);
            });
        }

        // If no dates are selected, calculate for the current month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return categories.map(category => {
            return expensesToUse
                .filter(expense => {
                    const expenseDate = new Date(expense.date);
                    return expense.category === category &&
                           expenseDate.getMonth() === currentMonth &&
                           expenseDate.getFullYear() === currentYear;
                })
                .reduce((acc, expense) => acc + expense.amount, 0);
        });
    };

    const expenseData = getExpenseData();

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
            <div>
                <label>Select Start Date:</label>
                <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    dateFormat="yyyy-MM-dd"
                    isClearable
                />
            </div>
            <div>
                <label>Select End Date:</label>
                <DatePicker 
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)} 
                    dateFormat="yyyy-MM-dd"
                    isClearable
                />
            </div>
            {expenseData.some(amount => amount > 0) ? (
                <Pie data={data} />
            ) : (
                <p>No expenses to display for the selected date range or the current month.</p>
            )}
        </div>
    );
};

export default ExpenseSummary;
