const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-37">
      {/* Total Income Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-lg border border-emerald-100 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-emerald-600 mb-1">Total Income</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-800 truncate">$5,247.80</p>
            <p className="text-xs text-emerald-500 mt-1">+12.5% from last month</p>
          </div>
          <div className="bg-emerald-500 p-2 sm:p-3 rounded-full ml-2 sm:ml-4 flex-shrink-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2v20m5-5l-5-5-5 5"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Total Expense Card */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl shadow-lg border border-red-100 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-600 mb-1">Total Expenses</p>
            <p className="text-2xl sm:text-3xl font-bold text-red-800 truncate">$3,182.45</p>
            <p className="text-xs text-red-500 mt-1">+8.2% from last month</p>
          </div>
          <div className="bg-red-500 p-2 sm:p-3 rounded-full ml-2 sm:ml-4 flex-shrink-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2v20m5-5l-5 5-5-5"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Current Balance Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-100 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-blue-600 mb-1">Current Balance</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-800 truncate">$2,065.35</p>
            <p className="text-xs text-blue-500 mt-1">Available balance</p>
          </div>
          <div className="bg-blue-500 p-2 sm:p-3 rounded-full ml-2 sm:ml-4 flex-shrink-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
              viewBox="0 0 24 24"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <path d="M16 8h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4"/>
              <circle cx="9" cy="9" r="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCards;