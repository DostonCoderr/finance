import React, { useState, useContext, useEffect } from "react";
import { FinanceContext } from "../context/FinanceContext";
import Filter from "../components/Filter";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "../style/TransactionList.css";

const TransactionList = () => {
  const { transactions } = useContext(FinanceContext);
  const [dateFilter, setDateFilter] = useState("");
  const [commentFilter, setCommentFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); 
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10); 

  const applyFilters = () => {
    let filtered = transactions;

    // Data Boyicha
    if (dateFilter) {
      filtered = filtered.filter((txn) => txn.date.includes(dateFilter));
    }

    // Filter Boyicha
    if (commentFilter) {
      filtered = filtered.filter(
        (txn) =>
          txn.comment &&
          txn.comment.toLowerCase().includes(commentFilter.toLowerCase())
      );
    }

    // Category Boyicha
    if (categoryFilter) {
      filtered = filtered.filter(
        (txn) =>
          txn.category &&
          txn.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [dateFilter, commentFilter, categoryFilter, transactions]);

  // Exel, Pdf, cv boyicha Yuklash
  const downloadCSV = () => {
    const csvData = [
      ["Category", "Amount", "Type", "Date", "Currency", "Comment"],
      ...filteredTransactions.map((txn) => [
        txn.category,
        txn.amount,
        txn.type.toUpperCase(),
        txn.date,
        txn.currency,
        txn.comment || "",
      ]),
    ];

    const csvString = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    saveAs(blob, "transactions.csv");
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredTransactions.map((txn) => ({
        Category: txn.category,
        Amount: txn.amount,
        Type: txn.type.toUpperCase(),
        Date: txn.date,
        Currency: txn.currency,
        Comment: txn.comment || "",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Tranzaktsiyalar tarixi", 20, 20);

    let yPosition = 30;
    filteredTransactions.forEach((txn, index) => {
      doc.setFontSize(12);
      doc.text(
        `${txn.category}: $${txn.amount} - ${txn.type.toUpperCase()} | ${
          txn.date
        } | Currency: ${txn.currency}`,
        20,
        yPosition
      );
      if (txn.comment) {
        yPosition += 8;
        doc.text(`Note: ${txn.comment}`, 20, yPosition);
      }
      yPosition += 15;
    });

    doc.save("transactions.pdf");
  };

  // Paginatsiya
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="transaction-list-container shadow-lg">
      <div className="transaction-list-header">
        <h5 className="card-title mb-0">Tranzaktsiyalar tarixi</h5>
      </div>
      <div className="transaction-list-body">
        <Filter
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          commentFilter={commentFilter}
          setCommentFilter={setCommentFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          applyFilters={applyFilters}
        />
        <div className="transaction-downloads">
          <button onClick={downloadCSV} className="btn btn-primary">
          CSV-ni Formatida yuklab oling
          </button>
          <button onClick={downloadExcel} className="btn btn-success">
          Excel Formatida yuklab oling
          </button>
          <button onClick={downloadPDF} className="btn btn-danger">
          PDF Formatida yuklab olish
          </button>
        </div>
        {currentTransactions.length > 0 ? (
          <table className="transaction-table table table-striped table-bordered">
            <thead>
              <tr>
                <th>Turkum</th>
                <th>Miqdori</th>
                <th>Turi</th>
                <th>Sana</th>
                <th>Valyuta</th>
                <th>Izoh</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((txn, index) => (
                <tr
                  key={index}
                  className={
                    txn.type === "income" ? "table-success" : "table-danger"
                  }
                >
                  <td>{txn.category}</td>
                  <td>${txn.amount}</td>
                  <td>{txn.type.toUpperCase()}</td>
                  <td>{txn.date}</td>
                  <td>{txn.currency}</td>
                  <td>{txn.comment || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted no-transactions">
            No transactions found. Add some to get started!
          </p>
        )}

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
           Oldingi
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredTransactions.length / transactionsPerPage)}
          </span>
          <button
            className="pagination-btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredTransactions.length / transactionsPerPage)
            }
          >
           Keyingisi
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
