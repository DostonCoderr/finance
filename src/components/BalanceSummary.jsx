import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { FaArrowUp, FaArrowDown, FaBalanceScale } from "react-icons/fa";
import "../style/BalanceSummary.css";

const BalanceSummary = () => {
  const { transactions } = useContext(FinanceContext);
  const income = transactions
    .filter((txn) => txn.type === "income")
    .reduce((acc, txn) => acc + (isNaN(parseFloat(txn.amount)) ? 0 : parseFloat(txn.amount)), 0);

  const expense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, txn) => acc + (isNaN(parseFloat(txn.amount)) ? 0 : parseFloat(txn.amount)), 0);
  const balance = income - expense;
  const total = income + expense;
  const incomePercentage = total > 0 ? ((income / total) * 100).toFixed(1) : 0;
  const expensePercentage = total > 0 ? ((expense / total) * 100).toFixed(1) : 0;
  const balancePercentage = total > 0 ? ((balance / total) * 100).toFixed(1) : 0;

  return (
    <div className="balance-summary">
      <div className="balance-card income-card">
        <div
          className="circle"
          style={{ background: incomePercentage > 0 ? "green" : "red" }}
        >
          <span>{incomePercentage}%</span>
        </div>
        <h4>${income.toFixed(2)}</h4>
        <p>Jami daromad</p>
        <FaArrowUp className="card-icon" />
      </div>

      <div className="balance-card expense-card">
        <div
          className="circle"
          style={{ background: expensePercentage > 0 ? "red" : "green" }}
        >
          <span>{expensePercentage}%</span>
        </div>
        <h4>${expense.toFixed(2)}</h4>
        <p>Jami xarajat</p>
        <FaArrowDown className="card-icon" />
      </div>
      <div className="balance-card net-card">
        <div
          className="circle"
          style={{
            background:
              balancePercentage > 0
                ? "linear-gradient(135deg, #6a11cb, #2575fc)"
                : "linear-gradient(135deg, #ff5f6d, #ffc371)",
          }}
        >
          <span>{balancePercentage}%</span>
        </div>
        <h4>${balance.toFixed(2)}</h4>
        <p>Xozirgi balans</p>
        <FaBalanceScale className="card-icon" />
      </div>
    </div>
  );
};

export default BalanceSummary;
