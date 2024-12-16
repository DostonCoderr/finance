import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import "../style/TransactionForm.css";
import { FaRegMoneyBillAlt, FaRegCalendarAlt, FaRegCommentDots } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

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

    toast.success("🎉 Tranzaksiya muvaffaqiyatli qo'shildi!", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
      transition: Slide,
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
    <>
      <div className="form-container">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h3 className="form-title">✨Tranzaksiya qo'shish</h3>

          <div className="form-group">
            <label className="floating-label">Turi</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="form-input animated-select"
              required
            >
              <option value="daromad">Daromad</option>
              <option value="xarajat">Xarajat</option>
            </select>
          </div>

          <div className="form-group">
            <label className="floating-label">Turkum</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-input animated-select"
              required
            >
              <option value="Ish haqi">Ish haqi</option>
              <option value="Ijara">Ijara</option>
              <option value="Oziq-ovqat">Oziq-ovqat</option>
              <option value="O'yin-kulgi">O'yin-kulgi</option>
              <option value="Transport">Transport</option>
            </select>
          </div>

          <div className="form-group">
            <label className="floating-label">Miqdori</label>
            <input
              type="number"
              name="amount"
              placeholder="Miqdorni kiriting"
              value={form.amount}
              onChange={handleChange}
              className="form-input animated-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="floating-label">Valyuta</label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="form-input animated-select"
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UZS">UZS</option>
            </select>
          </div>

          <div className="form-group">
            <label className="floating-label">
            Sana <FaRegCalendarAlt />
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-input animated-date-picker"
              required
            />
          </div>

          <div className="form-group">
            <label className="floating-label">
            Izoh <FaRegCommentDots />
            </label>
            <textarea
              name="comment"
              placeholder="Fikr qo'shing (ixtiyoriy)"
              value={form.comment}
              onChange={handleChange}
              className="form-input animated-textarea"
            ></textarea>
          </div>

          <button type="submit" className="animated-submit-btn">
            <FaRegMoneyBillAlt /> Tranzaksiya qo'shish
          </button>
        </form>
      </div>
{/* Notification Yani Xabarnoma */}
      <ToastContainer />
    </>
  );
};

export default TransactionForm;
