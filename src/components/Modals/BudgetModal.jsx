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
        setFormData({
          month: new Date().toISOString().slice(0, 7),
          openingBalance: "",
        });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 sm:mx-auto border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {initialData ? "Edit Budget" : "Create New Budget"}
              </h2>
              <p className="text-sm text-gray-600">
                {initialData ? "Update your budget information" : "Set up your monthly budget"}
              </p>
            </div>

            {/* Close button - only show if editing */}
            {initialData && (
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/60 rounded-full transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Month Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Month
            </label>
            <div className="relative">
              <input
                name="month"
                type="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Opening Balance Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Opening Balance
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">₹</span>
              </div>
              <input
                name="openingBalance"
                type="number"
                placeholder="Enter opening balance"
                value={formData.openingBalance}
                onChange={handleChange}
                className="w-full border border-gray-300 pl-8 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            {initialData && (
              <button 
                type="button" 
                onClick={onClose} 
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 border border-gray-200"
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {initialData ? "Update Budget" : "Create Budget"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;