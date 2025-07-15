import BudgetOverview from "./BudgetOverview/BudgetOverview";
import RecurringRules from "./RecurringRules/RecurringRules";
const BudgetRecurring = () => {
  return (
    <>
      <div>
        <BudgetOverview />
      </div>
      <div >
        <RecurringRules />
      </div>
    </>
  );
};

export default BudgetRecurring;
