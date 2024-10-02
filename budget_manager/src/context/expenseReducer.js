// src/context/expenseReducer.js
export const expenseReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_EXPENSE':
        return { ...state, expenses: [...state.expenses, action.payload] };
      case 'SET_BUDGET':
        return { ...state, budgets: [...state.budgets, action.payload] };
      default:
        return state;
    }
  };
  