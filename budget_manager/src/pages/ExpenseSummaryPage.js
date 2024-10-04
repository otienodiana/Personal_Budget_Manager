import React, { useState } from 'react';
import ExpenseSummary from '../components/ExpenseSummary';
import BudgetAlert from '../components/BudgetAlert'; // Import the BudgetAlert component

const ExpenseSummaryPage = ({ expenses, budgetLimits, setBudgetLimit, updateBudgetLimit, deleteBudgetLimit }) => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [editingIndex, setEditingIndex] = useState(null); 
    const [selectedMonth, setSelectedMonth] = useState('');

    const categories = [
        'Food',
        'Transportation',
        'Utilities',
        'Entertainment',
        'Health',
        'Other'
    ];

    const months = [
        { value: '', label: 'Select a month' },
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const budgetLimit = {
            category,
            amount: Number(amount),
            date,
        };

        if (editingIndex !== null) {
            updateBudgetLimit(editingIndex, budgetLimit);
            setEditingIndex(null);
        } else {
            setBudgetLimit(budgetLimit);
        }

        clearFields();
    };

    const clearFields = () => {
        setCategory('');
        setAmount('');
        setDate('');
    };

    const handleEdit = (index) => {
        const limitToEdit = budgetLimits[index];
        setCategory(limitToEdit.category);
        setAmount(limitToEdit.amount);
        setDate(limitToEdit.date);
        setEditingIndex(index);
    };

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.toLocaleString('default', { month: 'long' });
        return expenseMonth === selectedMonth;
    });

    return (
        <div>
            <h1>Expense Summary</h1>
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            >
                {months.map((month, index) => (
                    <option key={index} value={month.value}>
                        {month.label}
                    </option>
                ))}
            </select>

            <ExpenseSummary expenses={filteredExpenses} />

            <div className="set-budget-container">
                <h2>Set Budget Limit</h2>
                <form onSubmit={handleSubmit}>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter budget limit"
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <button type="submit">{editingIndex !== null ? 'Update Budget' : 'Set Budget'}</button>
                </form>

                <h2>Limits List</h2>
                {budgetLimits.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Date Set</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgetLimits.map((limit, index) => (
                                <tr key={index}>
                                    <td>{limit.category}</td>
                                    <td>${limit.amount}</td>
                                    <td>{limit.date}</td>
                                    <td>
                                        <button onClick={() => handleEdit(index)}>Update</button>
                                        <button onClick={() => deleteBudgetLimit(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No budget limits set.</p>
                )}
            </div>

            {/* Add the BudgetAlert component here */}
            <BudgetAlert budgetLimits={budgetLimits} expenses={expenses} />
        </div>
    );
};

export default ExpenseSummaryPage;
