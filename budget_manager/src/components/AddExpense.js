import React, { useState } from 'react';

const AddExpense = ({ addExpense }) => {
    const [expense, setExpense] = useState({
        name: '',
        amount: '',
        date: '',
        category: '', 
    });

    const categories = [
        'Food',
        'Transportation',
        'Utilities',
        'Entertainment',
        'Health',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof addExpense === 'function') {
            addExpense(expense); // Call the passed function
            setExpense({ name: '', amount: '', date: '', category: '' }); // Reset form fields after submission
        } else {
            console.error('addExpense is not a function');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Expense Name"
                value={expense.name}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expense.amount}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="date"
                value={expense.date}
                onChange={handleChange}
                required
            />
            <select
                name="category"
                value={expense.category}
                onChange={handleChange}
                required
            >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpense;
