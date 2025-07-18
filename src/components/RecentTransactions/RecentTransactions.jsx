import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../services/url.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionModal from "../Modals/TransactionModal";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [operationLoading, setOperationLoading] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const token = localStorage.getItem("token");

  const setOperationLoadingState = (key, value) => {
    setOperationLoading(prev => ({ ...prev, [key]: value }));
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/transactions/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error("Failed to fetch transactions:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchData();
    const intervalId = setInterval(fetchData, 1700);
    return () => clearInterval(intervalId);
  }, [token]);

  const deleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        setOperationLoadingState("deleteTransaction", true);
        await axios.delete(`${BASE_URL}/api/transactions/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Transaction deleted successfully!");
        await fetchData();
      } catch (error) {
        console.error("Error deleting transaction:", error);
        toast.error("Failed to delete transaction. Please try again.");
      } finally {
        setOperationLoadingState("deleteTransaction", false);
      }
    }
  };

  const openEditModal = (transaction) => {
    setSelectedTx(transaction);
    setModalOpen(true);
  };

  const recentTransactions = transactions.slice().reverse(); // show newest first

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
        </div>

        <div className="p-6">
          <div
            className="space-y-4 overflow-y-auto"
            style={{ minHeight: "28rem", maxHeight: "28rem" }} // ~8 items tall
          >
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => (
                <div
                  key={transaction._id || index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold ${
                        transaction.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? "+ " : "– "}
                      ₹{(transaction.amount || 0).toLocaleString("en-IN")}
                    </span>

                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditModal(transaction)}
                        className="text-blue-500 cursor-pointer hover:text-blue-700 p-1"
                        title="Edit transaction"
                      >
                        {/* Edit icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>

                      <button
                        onClick={() => deleteTransaction(transaction._id)}
                        className={`text-red-500 cursor-pointer hover:text-red-700 p-1 ${
                          operationLoading.deleteTransaction ? "opacity-50 pointer-events-none" : ""
                        }`}
                        title="Delete transaction"
                      >
                        {/* Delete icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          className="w-4 h-4" viewBox="0 0 24 24">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No transactions yet. Add your first transaction!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedTx}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default RecentTransactions;
