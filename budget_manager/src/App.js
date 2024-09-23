import React, { useReducer } from 'react';
import AddExpense from './components/AddExpense';
import ViewExpenses from './components/ViewExpenses';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetAlert from './components/BudgetAlert';
import BudgetLimit from './components/BudgetLimit'; // Import the BudgetLimit component
import { expenseReducer } from './reducers/expenseReducer';
import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(expenseReducer, { expenses: [], budgetLimits: {} });

  const addExpense = (expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  const setBudgetLimit = ({ category, amount }) => {
    dispatch({ type: 'SET_BUDGET_LIMIT', payload: { category, limit: amount } });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Personal Budget Manager</h1>
      <div className="content-container">
        <AddExpense addExpense={addExpense} />
        <BudgetLimit setBudgetLimit={setBudgetLimit} /> {/* Add BudgetLimit here */}
        <ViewExpenses expenses={state.expenses} />
      </div>
      <div className="summary-container">
        <ExpenseSummary expenses={state.expenses} />
        <BudgetAlert expenses={state.expenses} budgetLimits={state.budgetLimits} />
      </div>
    </div>
  );
};

export default App;
