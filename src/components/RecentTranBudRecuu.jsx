import BudgetRecurring from "./BudgetRecurring";
import RecentTransactions from "./RecentTransactions/RecentTransactions";

const RecentTranBudRecuu = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <RecentTransactions />
        </div>
        <div className="w-full -mt-6">
          <BudgetRecurring />
        </div>
      </div>
    </div>
  );
};

export default RecentTranBudRecuu;