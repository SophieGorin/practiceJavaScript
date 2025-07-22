import React from 'react';
import './FilterControls.css';

const FilterControls = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Filter by name..."
        />
      </div>
      
      <div className="filter-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={filters.age}
          onChange={handleChange}
          placeholder="Filter by age..."
        />
      </div>
      
      <div className="filter-group">
        <label>Gender:</label>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={filters.phone}
          onChange={handleChange}
          placeholder="Filter by phone..."
        />
      </div>
      
      <div className="filter-group">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleChange}
          placeholder="Filter by email..."
        />
      </div>
      
      <div className="filter-group">
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={filters.country}
          onChange={handleChange}
          placeholder="Filter by country..."
        />
      </div>
      
      <div className="filter-group">
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleChange}
          placeholder="Filter by city..."
        />
      </div>
    </div>
  );
};

export default FilterControls;