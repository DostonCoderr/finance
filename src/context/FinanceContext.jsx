import React, { createContext, useState, useEffect } from "react";

export const FinanceContext = createContext({
  transactions: [],
  addTransaction: () => {},
  baseCurrency: "USD",
  setBaseCurrency: () => {},
  exchangeRates: {},
  isLoadingRates: false,
  error: null,
});

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    try {
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    } catch (error) {
      console.error("Error parsing transactions from localStorage:", error);
      return [];
    }
  });

  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoadingRates(true);
      setError(null);
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/7a233573b2dd471190ebaef2/latest/${baseCurrency}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch exchange rates: ${res.status}`);
        }
        const data = await res.json();
        setExchangeRates(data.conversion_rates || {});
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setError("Unable to load exchange rates. Please try again later.");
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  const addTransaction = (transaction) => {
    const newTransaction = { id: Date.now(), ...transaction };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        baseCurrency,
        setBaseCurrency,
        exchangeRates,
        isLoadingRates,
        error,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
