import { createContext, useState, useEffect } from "react";
import makeAPICall from "../services/api"; // Make sure this wraps axios properly

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [transactionsRes, recurringRes, budgetRes] = await Promise.allSettled([
        makeAPICall("/api/transactions", token),
        makeAPICall("/api/recurring", token),
        makeAPICall("/api/budget", token)
      ]);

      const newData = {};

      // ✅ Transactions response
      if (transactionsRes.status === "fulfilled") {
        const {
          transactions = [],
          openingBalance = 0,
          totalCredit = 0,
          totalDebit = 0,
          netBalance = 0
        } = transactionsRes.value;
        newData.transactions = transactions;
        newData.budgetStats = { openingBalance, totalCredit, totalDebit, netBalance };
      }

      // ✅ Recurring rules response
      if (recurringRes.status === "fulfilled") {
        const response = recurringRes.value;
        newData.recurringRules = Array.isArray(response?.recurring)
          ? response.recurring
          : Array.isArray(response)
          ? response
          : [];
      }

      // ✅ Budget response
      if (budgetRes.status === "fulfilled") {
        newData.budget = budgetRes.value;
      }

      setData(newData);
    } catch (err) {
      console.error("fetchData error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  return (
    <ExpenseContext.Provider value={{ data, setData, loading, fetchData }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
export { ExpenseContext };
