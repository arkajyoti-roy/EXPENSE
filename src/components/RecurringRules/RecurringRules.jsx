import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

const RecurringRules = () => {
  // Sample data for demonstration - replace with your actual data source
  const [recurringRules, setRecurringRules] = useState([
    {
      _id: "1",
      description: "Monthly Rent Payment",
      startDate: "2024-01-01",
      frequency: "monthly",
      amount: 25000,
    },
    {
      _id: "2",
      title: "Weekly Grocery Budget",
      date: "2024-01-15",
      frequency: "weekly",
      amount: 3000,
    },
    {
      _id: "3",
      description: "Annual Insurance Premium",
      startDate: "2024-03-01",
      frequency: "yearly",
      amount: 15000,
    },
  ]);

  const openEditRecurring = (rule) => {
    console.log("Edit recurring rule:", rule);
    // Add your edit logic here
  };

  const deleteRecurringRule = (ruleId) => {
    if (
      window.confirm("Are you sure you want to delete this recurring rule?")
    ) {
      setRecurringRules((prev) => prev.filter((rule) => rule._id !== ruleId));
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
                          {rule.description || rule.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditRecurring(rule)}
                          className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Edit recurring rule"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => deleteRecurringRule(rule._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete recurring rule"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                      <span>
                        Start:{" "}
                        {new Date(rule.startDate || rule.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>

                      <span className="capitalize">
                        {rule.frequency?.charAt(0).toUpperCase() +
                          rule.frequency?.slice(1)}
                      </span>

                      <span className="font-semibold text-green-600">
                        ₹{(rule.amount || 0).toLocaleString()}
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