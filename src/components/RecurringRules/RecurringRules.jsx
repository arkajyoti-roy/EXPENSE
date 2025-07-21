import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, Plus } from "lucide-react";
import BASE_URL from "../../services/url.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecurringModal from "../Modals/RecurringModal";

const RecurringRules = () => {
  const [recurringRules, setRecurringRules] = useState([]);
  const [operationLoading, setOperationLoading] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const token = localStorage.getItem("token");

  const setOperationLoadingState = (key, value) => {
    setOperationLoading(prev => ({ ...prev, [key]: value }));
  };

  const fetchRecurringRules = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/recurring/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const rules = Array.isArray(res.data.recurring)
        ? res.data.recurring
        : Array.isArray(res.data)
        ? res.data
        : [];

      setRecurringRules(rules);
    } catch (err) {
      console.error("Failed to fetch recurring rules:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchRecurringRules(); // Initial fetch
    // const interval = setInterval(fetchRecurringRules, 1700); // Poll every 1.7s
    // return () => clearInterval(interval);
  }, [token]);

  const deleteRecurringRule = async (id) => {
    if (window.confirm("Are you sure you want to delete this recurring rule?")) {
      try {
        setOperationLoadingState("deleteRecurring", true);
        await axios.delete(`${BASE_URL}/api/recurring/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Recurring rule deleted successfully!");
        await fetchRecurringRules();
      } catch (error) {
        console.error("Error deleting recurring rule:", error);
        toast.error("Failed to delete recurring rule. Please try again.");
      } finally {
        setOperationLoadingState("deleteRecurring", false);
      }
    }
  };

  const openModalToCreate = () => {
    setSelectedRule(null);
    setModalOpen(true);
  };

  const openModalToEdit = (rule) => {
    setSelectedRule(rule);
    setModalOpen(true);
  };

  const handleModalSuccess = () => {
    setModalOpen(false);
    setSelectedRule(null);
    fetchRecurringRules();
  };

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recurring Rules</h2>
          <button
            onClick={openModalToCreate}
            className="flex items-center gap-1 cursor-pointer text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 text-sm rounded"
          >
            <Plus size={14} />
            Add Rule
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recurringRules.length > 0 ? (
              recurringRules.map((rule) => (
                <div
                  key={rule._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-gray-800">
                        {rule.description || rule.title || "Untitled Rule"}
                      </h3>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModalToEdit(rule)}
                          className="text-blue-500 cursor-pointer hover:text-blue-700 p-1"
                          title="Edit recurring rule"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteRecurringRule(rule._id)}
                          className={`text-red-500 cursor-pointer hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors ${
                            operationLoading.deleteRecurring ? "opacity-50 pointer-events-none" : ""
                          }`}
                          title="Delete recurring rule"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                      <span>
                        Start:{" "}
                        {new Date(rule.startsOn || rule.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                      <span className="capitalize">{rule.frequency}</span>
                      <span
                        className={`font-semibold ${
                          rule.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {rule.type === "credit" ? "+ " : "– "}₹{(rule.amount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No recurring rules set up yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <RecurringModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedRule}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default RecurringRules;
