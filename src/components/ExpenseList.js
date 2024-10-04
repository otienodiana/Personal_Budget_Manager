import React, { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';

const ExpenseList = () => {
    const { state } = useContext(BudgetContext);
    
    return (
        <ul>
            {state.expenses.map((expense, index) => (
                <li key={index}>
                    {expense.date}: ${expense.amount} - {expense.category}
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;
