import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddExpensePage from './pages/AddExpensePage';
import ExpenseSummaryPage from './pages/ExpenseSummaryPage';
import SetBudgetPage from './pages/SetBudgetPage';
import BudgetAlert from './components/BudgetAlert'; // Import BudgetAlert component
import './App.css';

const App = () => {
    const [budgetLimits, setBudgetLimits] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const setBudgetLimit = (newLimit) => {
        setBudgetLimits((prevLimits) => [...prevLimits, newLimit]);
    };

    const updateBudgetLimit = (index, updatedLimit) => {
        const newLimits = budgetLimits.map((limit, idx) => (idx === index ? updatedLimit : limit));
        setBudgetLimits(newLimits);
    };

    const deleteBudgetLimit = (index) => {
        const newLimits = budgetLimits.filter((_, idx) => idx !== index);
        setBudgetLimits(newLimits);
    };

    const addExpense = (expense) => {
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
    };

    const updateExpense = (index, updatedExpense) => {
        const newExpenses = expenses.map((expense, idx) => (idx === index ? updatedExpense : expense));
        setExpenses(newExpenses);
    };

    const deleteExpense = (index) => {
        const newExpenses = expenses.filter((_, idx) => idx !== index);
        setExpenses(newExpenses);
    };

    return (
        <Router>
            <div>
                <Navbar />
                <BudgetAlert budgetLimits={budgetLimits} expenses={expenses} /> {/* Include BudgetAlert here */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/add-expense"
                        element={
                            budgetLimits.length > 0 ? (
                                <AddExpensePage
                                    addExpense={addExpense}
                                    expenses={expenses}
                                    updateExpense={updateExpense}
                                    deleteExpense={deleteExpense}
                                />
                            ) : (
                                <Navigate to="/set-budget" />
                            )
                        }
                    />
                    <Route
                        path="/expense-summary"
                        element={
                            <ExpenseSummaryPage
                                expenses={expenses}
                                budgetLimits={budgetLimits}
                                setBudgetLimit={setBudgetLimit}
                                updateBudgetLimit={updateBudgetLimit}
                                deleteBudgetLimit={deleteBudgetLimit}
                            />
                        }
                    />
                    <Route
                        path="/set-budget"
                        element={
                            <SetBudgetPage
                                setBudgetLimit={setBudgetLimit}
                                budgetLimits={budgetLimits}
                                updateBudgetLimit={updateBudgetLimit}
                                deleteBudgetLimit={deleteBudgetLimit}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
