import { useEffect, useState } from "react";
import BudgetModal from "../Modals/BudgetModal";
import axios from "axios";
import BASE_URL from "../../services/url";
import { toast } from "react-toastify";

const DashboardWrapper = ({ children }) => {
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [blockAccess, setBlockAccess] = useState(false);

  const token = localStorage.getItem("token");
  const currentMonthKey = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  useEffect(() => {
    const checkBudgetStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/budget?month=${currentMonthKey}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const b = res.data;

        if (!b || typeof b.openingBalance !== "number" || b.openingBalance <= 0) {
          setBudgetModalOpen(true);
          setBlockAccess(true);
        }
      } catch {
        setBudgetModalOpen(true);
        setBlockAccess(true);
      }
    };

    if (token) checkBudgetStatus();
  }, [token]);

  const handleBudgetSuccess = () => {
    toast.success("Budget set successfully for this month!");
    setBudgetModalOpen(false);
    setBlockAccess(false);
  };

  return (
    <>
      <BudgetModal
        isOpen={budgetModalOpen}
        onClose={() => {}}
        onSuccess={handleBudgetSuccess}
        initialData={null}
      />
      {!blockAccess && children}
    </>
  );
};

export default DashboardWrapper;
