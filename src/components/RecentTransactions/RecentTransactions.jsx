const RecentTransactions = () => {
  // Sample transaction data
  const sampleTransactions = [
    {
      _id: "1",
      description: "Grocery Shopping",
      date: "2024-07-15",
      type: "debit",
      amount: 125.50
    },
    {
      _id: "2", 
      description: "Salary Deposit",
      date: "2024-07-14",
      type: "credit",
      amount: 2500.00
    },
    {
      _id: "3",
      description: "Coffee Shop",
      date: "2024-07-13",
      type: "debit",
      amount: 8.75
    },
    {
      _id: "4",
      description: "Freelance Payment",
      date: "2024-07-12",
      type: "credit",
      amount: 450.00
    },
    {
      _id: "5",
      description: "Gas Station",
      date: "2024-07-11",
      type: "debit",
      amount: 65.20
    }
  ];

  const safeTransactions = sampleTransactions || [];

  return (
    <div className="">
      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Recent Transactions
          </h3>
        </div>

        <div className="p-6">
          <div className="space-y-4 max-h-3/4 overflow-y-auto">
            {safeTransactions.slice(0, 10).map((transaction, index) => (
              <div
                key={transaction._id || index}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.date}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`font-bold ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}₹
                    {(transaction.amount || 0).toLocaleString()}
                  </span>

                  <div className="flex gap-1">
                    <button
                      onClick={() => console.log('Edit transaction:', transaction)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="Edit transaction"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        className="w-4 h-4" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => console.log('Delete transaction:', transaction._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete transaction"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        className="w-4 h-4" 
                        viewBox="0 0 24 24"
                      >
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {safeTransactions.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No transactions yet. Add your first transaction!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;