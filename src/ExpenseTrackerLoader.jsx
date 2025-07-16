
import { IndianRupee } from 'lucide-react';

const ExpenseTrackerLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-pulse">
            <IndianRupee className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-600 rounded-full animate-ping"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ExpenseTracker</h2>
        <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-slate-600 to-slate-800 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-600 mt-4 animate-pulse">Loading your financial dashboard...</p>
      </div>
    </div>
  );
};

export default ExpenseTrackerLoader;