import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import BASE_URL from "../../services/url";

const TransactionExport = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    if (token) fetchTransactions();
  }, [token]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("All Transactions Report", 14, 20);

    const rows = transactions.map(tx => [
      tx.description,
      tx.type.toUpperCase(),
      `₹${tx.amount.toLocaleString("en-IN")}`,
      new Date(tx.date).toLocaleDateString("en-GB")
    ]);

    doc.autoTable({
      head: [["Description", "Type", "Amount", "Date"]],
      body: rows,
      startY: 30
    });

    doc.save("transactions.pdf");
  };

  return (
    <div className="bg-white p-6 rounded shadow border border-gray-200 max-w-5xl mx-auto my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">📄 All Transactions</h2>
        <button
          onClick={exportPDF}
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
        >
          Download as PDF
        </button>
      </div>

      <div
        className="overflow-y-auto space-y-4"
        style={{ maxHeight: "36rem" }}
      >
        {transactions.length > 0 ? (
          transactions
            .slice()
            .reverse()
            .map(tx => (
              <div
                key={tx._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded border border-gray-200"
              >
                <div>
                  <p className="font-medium text-gray-800">{tx.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(tx.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <span
                  className={`font-bold ${
                    tx.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "credit" ? "+ " : "– "}
                  ₹{(tx.amount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            ))
        ) : (
          <p className="text-gray-500 text-center py-10">No transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionExport;
