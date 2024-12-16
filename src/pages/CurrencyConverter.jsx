import React, { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import "../style/CurrencyConvert.css";

const CurrencyConverter = () => {
  const { exchangeRates, isLoadingRates, error } = useContext(FinanceContext);
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UZS");
  const [convertedValue, setConvertedValue] = useState(null);

  const handleConvert = () => {
    if (!amount || !exchangeRates[toCurrency] || !exchangeRates[fromCurrency])
      return;
    const converted = (
      amount *
      (exchangeRates[toCurrency] / exchangeRates[fromCurrency])
    ).toFixed(2);
    setConvertedValue(converted);
  };

  return (
    <div className="currency-converter-card">
      <div className="currency-converter-header">
        <h5 className="card-title mb-0">Valyuta konvertori</h5>
      </div>
      <div className="currency-converter-body">
        <div className="input-group">
          <div>
            <label className="form-label">Miqdori:</label>
            <input
              type="number"
              className="currency-converter-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Miqdorni kiriting"
            />
          </div>

          <div>
            <label className="form-label">dan aylantirish:</label>
            <select
              className="currency-converter-select"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">ga aylantirish:</label>
            <select
              className="currency-converter-select"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="currency-converter-btn" onClick={handleConvert}>
          Konvertatsiya qilish
        </button>

        {isLoadingRates && (
          <div className="currency-converter-alert currency-converter-alert-info">
            Loading exchange rates...
          </div>
        )}
        {error && (
          <div className="currency-converter-alert currency-converter-alert-danger">
            {error}
          </div>
        )}
        {convertedValue && (
          <div className="currency-converter-result">
            {amount} {fromCurrency} = {convertedValue} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
