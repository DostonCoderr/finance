import React from "react";
import "../style/Filter.css";

const Filter = ({
  dateFilter,
  setDateFilter,
  commentFilter,
  setCommentFilter,
  categoryFilter,
  setCategoryFilter,
  applyFilters,
}) => {
  return (
    <div className="filter-section">
      <h6 className="filter-title">Tranzaktsiyalarni filtrlash</h6>
      <div className="filter-container">
        {/* Data Filter */}
        <div className="filter-item">
          <label className="form-label">Sana:</label>
          <input
            type="date"
            className="form-control filter-input"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              applyFilters();
            }}
          />
        </div>

        {/*Comment Filter */}
        <div className="filter-item">
          <label className="form-label">Fikrlar:</label>
          <input
            type="text"
            className="form-control filter-input"
            value={commentFilter}
            onChange={(e) => {
              setCommentFilter(e.target.value);
              applyFilters();
            }}
            placeholder="Izoh bo'yicha qidirish"
          />
        </div>

        {/* Kategoriya Filtir */}
        <div className="filter-item">
          <label className="form-label">Turkum:</label>
          <input
            type="text"
            className="form-control filter-input"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              applyFilters();
            }}
            placeholder="Kategoriya bo'yicha qidirish"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
