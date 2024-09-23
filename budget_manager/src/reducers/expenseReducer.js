// src/reducers/expenseReducer.js
const initialState = {
  expenses: [],
  budgetLimits: {
    food: 0,
    transport: 0,
    entertainment: 0,
    // Add other categories as needed
  },
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'SET_BUDGET_LIMIT':
      return {
        ...state,
        budgetLimits: {
          ...state.budgetLimits,
          [action.payload.category]: action.payload.limit,
        },
      };
    default:
      return state;
  }
};
