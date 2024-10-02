const BudgetAlert = ({ expenses, budgetLimits }) => {
    const [alerts, setAlerts] = useState([]);
  
    useEffect(() => {
      const storedAlerts = JSON.parse(localStorage.getItem('budgetAlerts')) || [];
      setAlerts(storedAlerts);
    }, []);
  
    const checkBudgetAlerts = useCallback(() => {
      const newAlerts = [];
      // Use budgetLimits as an object
      Object.entries(budgetLimits).forEach(([category, limit]) => {
        const totalExpenses = expenses
          .filter((expense) => expense.category === category)
          .reduce((acc, expense) => acc + expense.amount, 0);
  
        if (totalExpenses > limit) {
          const exceededAmount = totalExpenses - limit; // Calculate exceeded amount
          newAlerts.push(`You have exceeded the budget limit for ${category} by $${exceededAmount.toFixed(2)}!`);
        } else if (totalExpenses === limit) {
          newAlerts.push(`You have reached the budget limit for ${category}.`);
        }
      });
  
      return newAlerts;
    }, [expenses, budgetLimits]);
  
    useEffect(() => {
      const newAlerts = checkBudgetAlerts();
      setAlerts(newAlerts);
      localStorage.setItem('budgetAlerts', JSON.stringify(newAlerts));
    }, [checkBudgetAlerts]);
  
    const clearAlert = (index) => {
      const updatedAlerts = alerts.filter((_, i) => i !== index);
      setAlerts(updatedAlerts);
      localStorage.setItem('budgetAlerts', JSON.stringify(updatedAlerts));
    };
  
    return (
      <div>
        <h2>Alerts</h2>
        <ul>
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <li key={index}>
                {alert}
                <button onClick={() => clearAlert(index)}>Dismiss</button>
              </li>
            ))
          ) : (
            <p>No budget alerts at the moment.</p>
          )}
        </ul>
      </div>
    );
  };
  
  export default BudgetAlert;
  