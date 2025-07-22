import React from 'react';
import './PaginationControls.css';

const PaginationControls = ({ pagination, onPageChange, onItemsPerPageChange }) => {
  const { currentPage, itemsPerPage, totalItems } = pagination;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    onItemsPerPageChange(Number(e.target.value));
  };

  return (
    <div className="pagination-controls">
      <div className="items-per-page">
        <label>Items per page:</label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      
      <div className="page-buttons">
        <button 
          onClick={() => onPageChange(1)} 
          disabled={currentPage === 1}
          aria-label="First page"
        >
          «
        </button>
        
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ‹
        </button>
        
        <span>Page {currentPage} of {totalPages}</span>
        
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          ›
        </button>
        
        <button 
          onClick={() => onPageChange(totalPages)} 
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          »
        </button>
      </div>
      
      <div className="total-items">
        Total: {totalItems} users
      </div>
    </div>
  );
};

export default PaginationControls;