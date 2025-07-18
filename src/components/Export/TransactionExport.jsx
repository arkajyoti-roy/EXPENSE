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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6 pt-20">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>
              <button
                onClick={exportPDF}
                disabled={filteredTransactions.length === 0}
                className="inline-flex cursor-progress items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setSelectedMonth("");
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Year</option>
                  {Object.keys(availableMonths).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  disabled={!selectedYear}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select Month</option>
                  {selectedYear &&
                    availableMonths[selectedYear]?.map(month => (
                      <option key={month} value={month}>
                        {monthNames[month]} ({month})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="p-6">
            <div className="space-y-3" style={{ maxHeight: "36rem", overflowY: "auto" }}>
              {filteredTransactions.length > 0 ? (
                filteredTransactions
                  .slice()
                  .reverse()
                  .map(tx => (
                    <div
                      key={tx._id}
                      className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            tx.type === "credit" ? "bg-green-500" : "bg-red-500"
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900 truncate">{tx.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(tx.date).toLocaleDateString("en-GB")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start ml-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          tx.type === "credit" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {tx.type.toUpperCase()}
                        </span>
                        <span className={`ml-3 font-semibold ${
                          tx.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}>
                          {tx.type === "credit" ? "+ " : "– "}
                          ₹{(tx.amount || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or select a different time period.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionExport;