import React, { useContext } from "react";
import { FaDollarSign, FaEuroSign, FaCoins } from "react-icons/fa";
import { FinanceContext } from "../context/FinanceContext";
import "../style/Real-Time.css";
import ExpenseChart from "./ExpenseChart";

const RealTime = () => {
  const {
    exchangeRates,
    isLoadingRates,
    error,
    baseCurrency,
    setBaseCurrency,
  } = useContext(FinanceContext);

  if (isLoadingRates) {
    return <div className="loading">Loading real-time currency rates...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      {/* Left container */}
      <div className="left-container">
        <h3 className="updates-title">Real vaqtdagi valyuta kurslari</h3>
        <div className="currency-selector">
          <label htmlFor="currency-selector">Asosiy valyutani tanlang: </label>
          <select
            id="currency-selector"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UZS">UZS</option>
          </select>
        </div>
        <div className="currency-rates">
          <div className="currency-card">
            <FaDollarSign className="currency-icon" />
            <h3>USD</h3>
            <p>{exchangeRates.USD || "N/A"}</p>
          </div>
          <div className="currency-card">
            <FaEuroSign className="currency-icon" />
            <h3>EUR</h3>
            <p>{exchangeRates.EUR || "N/A"}</p>
          </div>
          <div className="currency-card">
            <FaCoins className="currency-icon" />
            <h3>UZS</h3>
            <p>{exchangeRates.UZS || "N/A"}</p>
          </div>
        </div>
      </div>
{/* Ong tarfdi Chart */}
      <div className="right-container">
        <ExpenseChart />
      </div>
    </div>
  );
};

export default RealTime;
