import Navbar from "./components/Navbar/Navbar.jsx";
import OverviewCards from "./components/OverviewCards/OverviewCards.jsx";
import ActionButton from "./components/ActionButtons/ActionButton.jsx";
// import RecentTransactions from "./components/RecentTransactions/RecentTransactions.jsx";
// import BudgetOverview from './components/BudgetOverview/BudgetOverview.jsx';
// import RecurringRules from './components/RecurringRules/RecurringRules.jsx';
// import BudgetRecurring from "./components/BudgetRecurring.jsx";
import RecentTranBudRecuu from "./components/RecentTranBudRecuu.jsx";

function AllComp() {
  return (
    <>
    <div className="-mt-1">
      <Navbar />
      </div>
      <div className="pt-20">
        <OverviewCards />

        <ActionButton />
        <RecentTranBudRecuu />
      </div>
      {/* <RecentTransactions /> */}
      {/* <BudgetOverview /> */}
      {/* <RecurringRules /> */}
      {/* <BudgetRecurring /> */}
      <footer className="text-center text-gray-500 text-xs p-4">
        &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </footer>
    </>
  );
}

export default AllComp;
