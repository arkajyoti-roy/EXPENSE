import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../services/url";
import { toast } from "react-toastify";

const RecurringModal = ({ isOpen, onClose, initialData = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "debit",
    frequency: "monthly",
    startsOn: new Date().toISOString().slice(0, 10),
    weeklyDay: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        amount: initialData.amount || "",
        type: initialData.type || "debit",
        frequency: initialData.frequency || "monthly",
        startsOn: initialData.startsOn?.slice(0, 10) || new Date().toISOString().slice(0, 10),
        weeklyDay: initialData.weeklyDay || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      startsOn: new Date(formData.startsOn),
      weeklyDay: formData.frequency === "weekly" ? formData.weeklyDay : undefined
    };

    try {
      const method = initialData ? "put" : "post";
      const url = initialData
        ? `${BASE_URL}/api/recurring/${initialData._id}`
        : `${BASE_URL}/api/recurring/`;

      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success(`Recurring rule ${initialData ? "updated" : "created"} successfully!`);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error saving recurring rule:", error);
      toast.error("Failed to save recurring rule.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? "Edit Recurring Rule" : "New Recurring Rule"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>

          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {formData.frequency === "weekly" && (
            <select
              name="weeklyDay"
              value={formData.weeklyDay}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Day</option>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          )}

          <input
            name="startsOn"
            type="date"
            value={formData.startsOn}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-gray-100 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm bg-green-600 text-white rounded">
              {initialData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecurringModal;
