import React, { useState, useEffect } from 'react';
import { fetchUsers } from './api/userService';
import UserTable from './components/UserTable/UserTable';
import UserModal from './components/UserModal/UserModal';
import FilterControls from './components/FilterControls/FilterControls';
import PaginationControls from './components/PaginationControls/PaginationControls';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [filters, setFilters] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    country: '',
    city: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data.users);
        setFilteredUsers(data.users);
        setPagination(prev => ({ ...prev, totalItems: data.users.length }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [users, filters, sortConfig]);

  const applyFiltersAndSorting = () => {
    let result = [...users];

    // Apply filters
    result = result.filter(user => {
      return (
        (filters.name === '' || 
          `${user.firstName} ${user.lastName} ${user.maidenName}`.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.age === '' || user.age.toString() === filters.age) &&
        (filters.gender === '' || user.gender.toLowerCase() === filters.gender.toLowerCase()) &&
        (filters.phone === '' || user.phone.includes(filters.phone)) &&
        (filters.email === '' || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (filters.country === '' || user.address.country.toLowerCase().includes(filters.country.toLowerCase())) &&
        (filters.city === '' || user.address.city.toLowerCase().includes(filters.city.toLowerCase()))
      );
    });

    // Apply sorting
    if (sortConfig.key && sortConfig.direction !== 'none') {
      result.sort((a, b) => {
        let aValue, bValue;

        if (sortConfig.key === 'name') {
          aValue = `${a.firstName} ${a.lastName} ${a.maidenName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName} ${b.maidenName}`.toLowerCase();
        } else if (sortConfig.key === 'country' || sortConfig.key === 'city') {
          aValue = a.address[sortConfig.key].toLowerCase();
          bValue = b.address[sortConfig.key].toLowerCase();
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredUsers(result);
    setPagination(prev => ({ ...prev, totalItems: result.length, currentPage: 1 }));
  };

  const handleSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePageChange = page => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = items => {
    setPagination(prev => ({ ...prev, itemsPerPage: items, currentPage: 1 }));
  };

  const handleRowClick = user => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <h1>User Table</h1>
      <FilterControls filters={filters} onFilterChange={handleFilterChange} />
      <UserTable 
        users={filteredUsers} 
        sortConfig={sortConfig} 
        onSort={handleSort} 
        onRowClick={handleRowClick}
        pagination={pagination}
      />
      <PaginationControls 
        pagination={pagination}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      {selectedUser && <UserModal user={selectedUser} onClose={closeModal} />}
    </div>
  );
}

export default App;