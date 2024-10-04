import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddExpensePage from './pages/AddExpensePage';
import ExpenseSummaryPage from './pages/ExpenseSummaryPage';
import SetBudgetPage from './pages/SetBudgetPage';
import BudgetAlert from './components/BudgetAlert';
import './App.css';

const App = () => {
    const [budgetLimits, setBudgetLimits] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedBudgetLimits = localStorage.getItem('budgetLimits');
        const storedExpenses = localStorage.getItem('expenses');

        if (storedBudgetLimits) {
            setBudgetLimits(JSON.parse(storedBudgetLimits));
        }

        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
        }
    }, []);

    // Save budgetLimits to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('budgetLimits', JSON.stringify(budgetLimits));
    }, [budgetLimits]);

    // Save expenses to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

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
                
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/add-expense"
                        element={
                            
                                <AddExpensePage
                                    addExpense={addExpense}
                                    expenses={expenses}
                                    updateExpense={updateExpense}
                                    deleteExpense={deleteExpense}
                                />
                            
                                
                            
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
                <BudgetAlert budgetLimits={budgetLimits} expenses={expenses} />
            </div>
        </Router>
    );
};

export default App;
