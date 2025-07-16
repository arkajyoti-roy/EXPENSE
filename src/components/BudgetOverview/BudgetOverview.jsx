import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../services/url.js";

const BudgetOverview = () => {
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const [overviewData, setOverviewData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });


  const currentMonthKey = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const readableMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/budget?month=${currentMonthKey}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBudget({ ...response.data, month: readableMonth });
      } catch (err) {
        console.error("❌ Budget fetch error:", err.message);
        setBudget(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchBudget();
  }, [token]);

  const balance = budget
    ? (budget.openingBalance || 0) + (budget.actualIncome || 0) - (budget.actualExpenses || 0)
    : 0;


  useEffect(() => {
    const fetchTransactionSummary = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/transactions/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const {
          transactions = [],
          // totalCredit = 0,
          // totalDebit = 0,
          netBalance = 0
        } = res.data;

        setTransactions(transactions);

        setOverviewData({
          // totalIncome: totalCredit,
          // totalExpense: totalDebit,
          balance: netBalance
        });
      } catch (err) {
        console.error("Failed to fetch transaction summary:", err.response?.data?.message || err.message);
      }
    };

    if (token) fetchTransactionSummary();
  }, [token]);

  const format = num => `₹${(num || 0).toLocaleString("en-IN")}`;


  return (
    <div className="max-w-4xl mx-auto pt-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Budget Overview
          </h3>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-gray-500 text-center">Loading budget for {readableMonth}...</p>
          ) : budget ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Month</span>
                <span className="font-medium text-gray-900">
                  {budget.month}
                </span>
              </div>

              {/* ✅ Opening Balance is now dynamic */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Opening Balance</span>
                <span className="font-medium text-blue-600">
                  ₹{Number(budget.openingBalance || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-800 font-semibold text-lg">Current Balance</span>
                  <span
                    className={`font-bold text-xl ${
                      balance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{format(overviewData.balance)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💰</div>
              <p className="text-gray-500 text-lg">
                No budget set. Create your first budget!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
