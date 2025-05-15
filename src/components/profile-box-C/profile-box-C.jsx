import React, { useState, useEffect } from 'react';
import './profile-box-C.css';

const ProfileBoxC = ({ avatar, name, id, status: initialStatus }) => {
  const [status, setStatus] = useState(initialStatus?.toLowerCase() || 'inactive');

  // Para actualizar el estado si cambia la prop externa
  useEffect(() => {
    setStatus(initialStatus?.toLowerCase() || 'inactive');
  }, [initialStatus]);

  const isActive = status === 'active';

  const toggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === 'active' ? 'inactive' : 'active'));
  };

  return (
    <div className="profile-yo">
      <div className="profile-header">
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="profile-info">
          <h3 className="name">
            {name}
            <span
              className={`status-badge ${isActive ? 'active' : 'inactive'}`}
              onClick={toggleStatus}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              title="Click to toggle status"
            >
              <div className="status-dot"></div>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </h3>
          <p className="id">{id}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBoxC;
