import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import BASE_URL from "../../services/url.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecurringRules = () => {
  const [recurringRules, setRecurringRules] = useState([]);
  const [operationLoading, setOperationLoading] = useState({});
  const token = localStorage.getItem("token");

  const setOperationLoadingState = (key, value) => {
    setOperationLoading(prev => ({ ...prev, [key]: value }));
  };

  const fetchRecurringRules = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/recurring/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
    if (token) fetchRecurringRules();
  }, [token]);

  const deleteRecurringRule = async (id) => {
    if (window.confirm("Are you sure you want to delete this recurring rule?")) {
      try {
        setOperationLoadingState("deleteRecurring", true);
        await axios.delete(`${BASE_URL}/api/recurring/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success("Recurring rule deleted successfully!");
        await fetchRecurringRules(); // ✅ trigger refresh after deletion
      } catch (error) {
        console.error("Error deleting recurring rule:", error);
        toast.error("Failed to delete recurring rule. Please try again.");
      } finally {
        setOperationLoadingState("deleteRecurring", false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recurring Rules</h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {Array.isArray(recurringRules) && recurringRules.length > 0 ? (
              recurringRules.map((rule, index) => (
                <div
                  key={rule._id || index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {rule.description || rule.title || "Untitled Rule"}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          disabled
                          className="text-blue-500 p-1 opacity-60 cursor-not-allowed"
                          title="Edit recurring rule (not implemented yet)"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => deleteRecurringRule(rule._id)}
                          className={`text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors ${
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

                      <span className="capitalize">
                        {rule.frequency?.charAt(0).toUpperCase() + rule.frequency?.slice(1)}
                      </span>

                      <span className="font-semibold text-green-600">
                        ₹{(rule.amount || 0).toLocaleString("en-IN")}
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
    </div>
  );
};

export default RecurringRules;
