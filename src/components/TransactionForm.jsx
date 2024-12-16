import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import "../style/TransactionForm.css"; 
import { FaRegMoneyBillAlt, FaRegCalendarAlt, FaRegCommentDots } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const TransactionForm = () => {
  const { addTransaction } = useContext(FinanceContext);

  const [form, setForm] = useState({
    type: "income",
    category: "Salary",
    amount: "",
    currency: "USD",
    date: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(form);

    toast.success("Tranzaksiya muvaffaqiyatli qoʻshildi!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce,
    });

    setForm({
      type: "income",
      category: "Salary",
      amount: "",
      currency: "USD",
      date: "",
      comment: "",
    });
  };

  return (
    <div className="transaction-form-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2 className="form-header">Tranzaksiya qo'shish</h2>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Turi</label>
            <select
              className="form-select"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="income">Daromad</option>
              <option value="expense">Xarajat</option>
            </select>
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Turkum</label>
            <select
              className="form-select"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="Salary">Ish haqi</option>
              <option value="Rent">Ijara</option>
              <option value="Food">Oziq-ovqat</option>
              <option value="Entertainment">O'yin-kulgi</option>
              <option value="Transport">Transport</option>
            </select>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label">Miqdori</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Currency */}
          <div className="form-group">
            <label className="form-label">Valyuta</label>
            <select
              className="form-select"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UZS">UZS</option>
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">Sana</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Comment */}
          <div className="form-group full-width">
            <label className="form-label">Izoh</label>
            <textarea
              className="form-control"
              placeholder="Optional comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <FaRegMoneyBillAlt className="me-2" />
          Tranzaksiya qo'shish
        </button>
      </form>

      {/* Toast yani Notifications*/}
      <ToastContainer />
    </div>
  );
};

export default TransactionForm;
