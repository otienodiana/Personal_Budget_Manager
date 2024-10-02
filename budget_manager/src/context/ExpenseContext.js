// src/context/ExpenseContext.js
import React, { createContext, useReducer } from 'react';
import { expenseReducer } from './expenseReducer';

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, { expenses: [], budgets: [] });

  const addExpense = (expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  const setBudget = (budget) => {
    dispatch({ type: 'SET_BUDGET', payload: budget });
  };

  return (
    <ExpenseContext.Provider value={{ ...state, addExpense, setBudget }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseProvider };
