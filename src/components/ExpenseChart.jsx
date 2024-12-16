import React, { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { FinanceContext } from "../context/FinanceContext";
import "chart.js/auto";
import "../style/ExpenseChart.css";

const Charts = () => {
  const { transactions } = useContext(FinanceContext);

  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const expenseData = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((acc, txn) => {
        acc[txn.category] = (acc[txn.category] || 0) + parseFloat(txn.amount);
        return acc;
      }, {});

    setChartData({
      labels: Object.keys(expenseData),
      datasets: [
        {
          data: Object.values(expenseData),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#FF5A72",
            "#2B99E0",
            "#EEC94A",
            "#3BBFBF",
            "#8F5BE6",
            "#FF8F36",
          ],
          borderWidth: 5,
          hoverOffset: 20,
        },
      ],
    });
    setIsLoading(false);
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#333",
          font: { size: 14, family: "Arial" },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: { size: 14 },
        cornerRadius: 8,
        padding: 12,
        animation: {
          duration: 500,
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutBounce",
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h5>Xarajatlar toifalari</h5>
      </div>
      <div className="chart-card-body">
        {isLoading ? (
          <p className="loading-chart">Loading Chart...</p>
        ) : Object.keys(chartData.labels || {}).length > 0 ? (
          <div className="chart-container">
            <Pie data={chartData} options={options} />
          </div>
        ) : (
          <p className="no-data">No expenses to display.</p>
        )}
      </div>
    </div>
  );
};

export default Charts;
