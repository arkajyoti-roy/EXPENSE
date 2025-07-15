import React from 'react';

const BudgetOverview = () => {
  // Sample budget data
  const budget = {
    month: "July 2024",
    openingBalance: 5000.00,
    plannedIncome: 4500.00,
    plannedExpenses: 3200.00,
    actualIncome: 4247.80,
    actualExpenses: 3182.45
  };

  // Calculate current balance
  const balance = (budget?.openingBalance || 0) + (budget?.actualIncome || 0) - (budget?.actualExpenses || 0);

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Budget Overview
          </h3>
        </div>
        <div className="p-6">
          {budget ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Month</span>
                <span className="font-medium text-gray-900">
                  {budget.month}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Opening Balance</span>
                <span className="font-medium text-blue-600">
                  ₹{(budget.openingBalance || 0).toLocaleString()}
                </span>
              </div>
              
              
              
              
              
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-800 font-semibold text-lg">Current Balance</span>
                  <span
                    className={`font-bold text-xl ${
                      balance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{balance.toLocaleString()}
                  </span>
                </div>
              </div>
              
              
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💰</div>
              <p className="text-gray-500 text-lg">
                No budget set. Create your first budget!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;