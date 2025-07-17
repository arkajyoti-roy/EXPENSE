import { useState, useEffect } from "react";
import axios from "axios";
import TransactionModal from "../Modals/TransactionModal";
import RecurringModal from "../Modals/RecurringModal";
import BudgetModal from "../Modals/BudgetModal";
import BASE_URL from "../../services/url";
import { useNavigate } from "react-router-dom";

const ActionButton = ({ fetchData }) => {
  const navigate = useNavigate();

  const [modalOpenTx, setModalOpenTx] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  const [modalOpenRecurring, setModalOpenRecurring] = useState(false);
  const [selectedRecurring, setSelectedRecurring] = useState(null);

  const [modalOpenBudget, setModalOpenBudget] = useState(false);
  const [budgetData, setBudgetData] = useState(null);

  const [isBudgetSet, setIsBudgetSet] = useState(false);

  const token = localStorage.getItem("token");
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  useEffect(() => {
    const checkBudgetStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/budget?month=${currentMonth}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const isValid = res.data && typeof res.data.openingBalance === "number" && res.data.openingBalance > 0;
        setIsBudgetSet(isValid);
        setBudgetData(isValid ? res.data : null);
      } catch (err) {
        setIsBudgetSet(false);
        setBudgetData(null);
      }
    };

    if (token) checkBudgetStatus();
  }, [token]);

  const openNewTransaction = () => {
    setSelectedTx(null);
    setModalOpenTx(true);
  };

  const openNewRecurring = () => {
    setSelectedRecurring(null);
    setModalOpenRecurring(true);
  };

  const openBudgetModal = () => {
    setModalOpenBudget(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 lg:gap-5 px-4 sm:px-6 lg:px-36 pt-4 sm:pt-6">
        {/* Add Transaction Button */}
        <button onClick={openNewTransaction} className="flex items-center justify-center sm:justify-start space-x-2 bg-emerald-500 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200 w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v8m-4-4h8"/>
          </svg>
          <span className="text-sm font-medium">Add Transaction</span>
        </button>

        {/* Add Recurring Button */}
        <button onClick={openNewRecurring} className="flex items-center justify-center sm:justify-start space-x-2 bg-blue-500 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          <span className="text-sm font-medium">Add Recurring</span>
        </button>

        {/* Create/Update Budget Button */}
        <button onClick={openBudgetModal} className="flex items-center justify-center sm:justify-start space-x-2 bg-purple-500 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path d="M9 11H3v9h6v-9z"/>
            <path d="M20 3H10v7h10V3z"/>
            <path d="M20 14h-4v6h4v-6z"/>
          </svg>
          <span className="text-sm font-medium">
            {isBudgetSet ? "Update Budget" : "Create Budget"}
          </span>
        </button>


       <button
  onClick={() => navigate("/home/history")}
  className="flex items-center justify-center sm:justify-start space-x-2 bg-blue-500 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto"
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M3 21v-5h5"/>
  </svg>
  <span className="text-sm font-medium">History</span>
</button>

      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={modalOpenTx}
        onClose={() => setModalOpenTx(false)}
        initialData={selectedTx}
        onSuccess={fetchData}
      />

      {/* Recurring Modal */}
      <RecurringModal
        isOpen={modalOpenRecurring}
        onClose={() => setModalOpenRecurring(false)}
        initialData={selectedRecurring}
        onSuccess={fetchData}
      />

      {/* Budget Modal */}
      <BudgetModal
        isOpen={modalOpenBudget}
        onClose={() => setModalOpenBudget(false)}
        initialData={budgetData}
        onSuccess={fetchData}
      />
    </>
  );
};

export default ActionButton;
