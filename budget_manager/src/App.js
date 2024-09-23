// src/App.js
import React, { useReducer } from 'react';
import AddExpense from './components/AddExpense';
import ViewExpenses from './components/ViewExpenses';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetAlert from './components/BudgetAlert';
import { expenseReducer } from './reducers/expenseReducer';

const App = () => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  return (
    <div>
      <h1>Personal Budget Manager</h1>
      <AddExpense addExpense={addExpense} />
      <ViewExpenses expenses={expenses} />
      <ExpenseSummary expenses={expenses} />
      <BudgetAlert expenses={expenses} />
    </div>
  );
};

export default App;
