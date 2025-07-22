import React from 'react';
import './UserModal.css';

const UserModal = ({ user, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{user.firstName} {user.lastName}</h2>
        
        <div className="modal-grid">
          <div className="modal-left">
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="user-avatar" />
            <div className="user-basic-info">
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Birth Date:</strong> {user.birthDate}</p>
            </div>
          </div>
          
          <div className="modal-right">
            <div className="info-section">
              <h3>Contact Information</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
            
            <div className="info-section">
              <h3>Physical Characteristics</h3>
              <p><strong>Height:</strong> {user.height} cm</p>
              <p><strong>Weight:</strong> {user.weight} kg</p>
            </div>
            
            <div className="info-section">
              <h3>Address</h3>
              <p>{user.address.address}</p>
              <p>{user.address.city}, {user.address.state}</p>
              <p>{user.address.postalCode}, {user.address.country}</p>
            </div>
            
            <div className="info-section">
              <h3>Company</h3>
              <p><strong>{user.company.name}</strong></p>
              <p>{user.company.department}</p>
              <p>{user.company.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;