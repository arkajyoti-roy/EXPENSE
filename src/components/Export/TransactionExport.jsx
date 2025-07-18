import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import BASE_URL from "../../services/url";
import { useNavigate } from "react-router-dom";

const TransactionExport = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [availableMonths, setAvailableMonths] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getPreviousYearMonth = () => {
    const now = new Date();
    const prev = new Date(now.getFullYear(), now.getMonth() - 1);
    return {
      year: String(prev.getFullYear()),
      month: String(prev.getMonth() + 1).padStart(2, "0")
    };
  };

  const fetchAvailableMonths = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/budget/available-months`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailableMonths(res.data.available || {});
    } catch (err) {
      console.error("Error fetching available months:", err);
    }
  };

  const fetchTransactions = async (year, month) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/transactions?year=${year}&month=${month}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const tx = res.data.transactions || [];
      setTransactions(tx);
      setFilteredTransactions(tx);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAvailableMonths();

    const { year, month } = getPreviousYearMonth();
    setSelectedYear(year);
    setSelectedMonth(month);
    fetchTransactions(year, month);
  }, [token]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      fetchTransactions(selectedYear, selectedMonth);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter(tx => {
      const description = tx.description?.toLowerCase() || "";
      const type = tx.type?.toLowerCase() || "";
      const amount = String(tx.amount || "");
      const date = new Date(tx.date).toLocaleDateString("en-GB");

      return (
        description.includes(query) ||
        type.includes(query) ||
        amount.includes(query) ||
        date.includes(query)
      );
    });

    setFilteredTransactions(filtered);
  }, [searchQuery, transactions]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Transactions for ${selectedMonth}/${selectedYear}`, 14, 20);

    const rows = filteredTransactions.map(tx => [
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

    doc.save(`transactions-${selectedYear}-${selectedMonth}.pdf`);
  };

  const monthNames = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
  };

  return (
    <>
      <div className="pt-28 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-100 px-3 py-1 rounded text-sm hover:bg-gray-200"
        >
          ← Back
        </button>

        <div className="bg-white p-6 rounded shadow border border-gray-200 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">📄 Transactions</h2>
              <p className="text-sm text-gray-500">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <button
              onClick={exportPDF}
              disabled={filteredTransactions.length === 0}
              className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Download as PDF
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedMonth("");
              }}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Select Year</option>
              {Object.keys(availableMonths).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              disabled={!selectedYear}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Select Month</option>
              {selectedYear &&
                availableMonths[selectedYear]?.map(month => (
                  <option key={month} value={month}>
                    {monthNames[month]} ({month})
                  </option>
                ))}
            </select>

            <input
              type="text"
              placeholder="Search by description, amount, type, date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Transaction List */}
          <div className="overflow-y-auto space-y-4" style={{ maxHeight: "36rem" }}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions
                .slice()
                .reverse()
                .map(tx => (
                  <div
                    key={tx._id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
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
              <p className="text-gray-500 text-center py-10">No transactions match your search.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionExport;
