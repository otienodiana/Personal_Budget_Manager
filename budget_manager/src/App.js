// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddExpensePage from './pages/AddExpensePage';
import ExpenseSummaryPage from './pages/ExpenseSummaryPage';
import BudgetAlertPage from './pages/BudgetAlertPage';
import SetBudgetPage from './pages/SetBudgetPage';
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
          <Route path="/expense-summary" element={<ExpenseSummaryPage expenses={expenses} />} />
          <Route path="/budget-alert" element={<BudgetAlertPage expenses={expenses} budgetLimits={budgetLimits} />} />
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
