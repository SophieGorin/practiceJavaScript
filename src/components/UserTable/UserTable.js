import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import './UserTable.css';

const UserTable = ({ users, sortConfig, onSort, onRowClick, pagination }) => {
  const [columnWidths, setColumnWidths] = useState({
    name: 200,
    age: 100,
    gender: 100,
    phone: 150,
    email: 200,
    country: 150,
    city: 150
  });

  const handleResizeStop = (key, width) => {
    setColumnWidths(prev => ({ ...prev, [key]: width }));
  };

  const getSortIndicator = key => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : sortConfig.direction === 'descending' ? '↓' : '';
  };

  const { currentPage, itemsPerPage } = pagination;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <Resizable
              size={{ width: columnWidths.name, height: 'auto' }}
              onResizeStop={(e, direction, ref) => handleResizeStop('name', ref.offsetWidth)}
              minWidth={50}
              maxWidth={800}
            >
              <th onClick={() => onSort('name')}>
                Name {getSortIndicator('name')}
              </th>
            </Resizable>
            <Resizable
              size={{ width: columnWidths.age, height: 'auto' }}
              onResizeStop={(e, direction, ref) => handleResizeStop('age', ref.offsetWidth)}
              minWidth={50}
              maxWidth={300}
            >
              <th onClick={() => onSort('age')}>
                Age {getSortIndicator('age')}
              </th>
            </Resizable>
            <Resizable
              size={{ width: columnWidths.gender, height: 'auto' }}
              onResizeStop={(e, direction, ref) => handleResizeStop('gender', ref.offsetWidth)}
              minWidth={50}
              maxWidth={300}
            >
              <th onClick={() => onSort('gender')}>
                Gender {getSortIndicator('gender')}
              </th>
            </Resizable>
            <Resizable
              size={{ width: columnWidths.phone, height: 'auto' }}
              onResizeStop={(e, direction, ref) => handleResizeStop('phone', ref.offsetWidth)}
              minWidth={50}
              maxWidth={300}
            >
              <th onClick={() => onSort('phone')}>
                Phone {getSortIndicator('phone')}
              </th>
            </Resizable>
            <Resizable
              size={{ width: columnWidths.email, height: 'auto' }}
              onResizeStop={(e, direction, ref) => handleResizeStop('email', ref.offsetWidth)}
              minWidth={50}
              maxWidth={400}
            >
              <th onClick={() => onSort('email')}>
                Email {getSortIndicator('email')}
              </th>
            </Resizable>
            <Resizable
              size={{ width: columnWidths.country, height: 'auto' }}
              onResizeStop={(e, direction, ref) => handleResizeStop('country', ref.offsetWidth)}
              minWidth={50}
              maxWidth={300}
            >
              <th onClick={() => onSort('country')}>
                Country {getSortIndicator('country')}
              </th>
            </Resizable>
            <Resizable
              size={{ width: columnWidths.city, height: 'auto' }}
              onResizeStop={(e, direction, ref) => handleResizeStop('city', ref.offsetWidth)}
              minWidth={50}
              maxWidth={300}
            >
              <th onClick={() => onSort('city')}>
                City {getSortIndicator('city')}
              </th>
            </Resizable>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id} onClick={() => onRowClick(user)}>
              <td style={{ width: columnWidths.name }}>
                {user.lastName} {user.firstName} {user.maidenName}
              </td>
              <td style={{ width: columnWidths.age }}>{user.age}</td>
              <td style={{ width: columnWidths.gender }}>{user.gender}</td>
              <td style={{ width: columnWidths.phone }}>{user.phone}</td>
              <td style={{ width: columnWidths.email }}>{user.email}</td>
              <td style={{ width: columnWidths.country }}>{user.address.country}</td>
              <td style={{ width: columnWidths.city }}>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;