import Navbar from "./components/Navbar/Navbar.jsx";
import OverviewCards from "./components/OverviewCards/OverviewCards.jsx";
import ActionButton from "./components/ActionButtons/ActionButton.jsx";
import RecentTranBudRecuu from "./components/RecentTranBudRecuu.jsx";
import DashboardWrapper from "./components/BudgetOverview/DashboardWrapper.jsx";
import { Routes, Route } from "react-router-dom";
import TransactionExport from "./components/Export/TransactionExport.jsx";

function AllComp() {
  return (
    <>
      <div className="-mt-1">
        <Navbar />
      </div>

      <DashboardWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <div className="pt-20">
                <OverviewCards />
                <ActionButton />
                <RecentTranBudRecuu />
              </div>
            }
          />
          <Route path="history" element={<TransactionExport />} />
        </Routes>
      </DashboardWrapper>

      <footer className="text-center text-gray-500 text-xs p-4">
        &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </footer>
    </>
  );
}

export default AllComp;
