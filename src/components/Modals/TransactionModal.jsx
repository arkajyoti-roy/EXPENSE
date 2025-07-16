import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../services/url";
import { toast } from "react-toastify";

const TransactionModal = ({ isOpen, onClose, initialData = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "debit",
    date: new Date().toISOString().slice(0, 10)
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.description || "",
        amount: initialData.amount?.toString() || "",
        type: initialData.type || "debit",
        date: initialData.date?.slice(0, 10) || new Date().toISOString().slice(0, 10)
      });
    } else {
      setFormData({
        description: "",
        amount: "",
        type: "debit",
        date: new Date().toISOString().slice(0, 10)
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      amount: Number(formData.amount),
      date: new Date(formData.date),
      month: formData.date.slice(0, 7) 
    };

    const method = initialData ? "put" : "post";
    const endpoint = initialData
      ? `${BASE_URL}/api/transactions/${initialData._id}`
      : `${BASE_URL}/api/transactions/`;

    try {
      await axios[method](endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success(`Transaction ${initialData ? "updated" : "added"} successfully!`);

      setFormData({
        description: "",
        amount: "",
        type: "debit",
        date: new Date().toISOString().slice(0, 10)
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error saving transaction:", error?.response?.data || error.message);
      toast.error("Failed to save transaction.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? "Edit Transaction" : "New Transaction"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <input
            name="description"
            type="text"
            placeholder="Description"
            value={formData.description}
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
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-gray-100 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded">
              {initialData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
