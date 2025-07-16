import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../services/url";
import { toast } from "react-toastify";

const BudgetModal = ({ isOpen, onClose, initialData = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    month: new Date().toISOString().slice(0, 7),
    openingBalance: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (initialData) {
      setFormData({
        month: initialData.month || new Date().toISOString().slice(0, 7),
        openingBalance: initialData.openingBalance?.toString() || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const openingBalanceNum = Number(formData.openingBalance);

    if (!formData.month) {
      toast.error("Month is required.");
      return;
    }

    if (isNaN(openingBalanceNum) || openingBalanceNum <= 0) {
      toast.error("Opening balance must be greater than zero.");
      return;
    }

    const payload = {
      month: formData.month,
      openingBalance: openingBalanceNum,
    };

    try {
      let response;

      if (initialData && initialData._id) {
        response = await axios.put(`${BASE_URL}/api/budget/${initialData._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Budget updated successfully!");
      } else {
        response = await axios.post(`${BASE_URL}/api/budget`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Budget created successfully!");
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("❌ Error saving budget:", error?.response?.data?.message || error.message);
      toast.error("Failed to save budget. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? "Edit Budget" : "New Budget"}
          </h2>

          {/* ⛔ Prevent closing if modal is enforced and no initialData */}
          {initialData && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
              &times;
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <input
            name="month"
            type="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="openingBalance"
            type="number"
            placeholder="Opening Balance"
            value={formData.openingBalance}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <div className="flex justify-end gap-3 pt-2">
            {initialData && (
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-gray-100 rounded">
                Cancel
              </button>
            )}
            <button type="submit" className="px-4 py-2 text-sm bg-purple-600 text-white rounded">
              {initialData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;
