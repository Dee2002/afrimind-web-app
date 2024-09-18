import React from 'react';
import './UserProfileCard.css';

const UserProfileCard = ({ name, email, joinDate, profileImage }) => {
  return (
    <div className="user-profile-card" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
      <img src={profileImage} alt={`${name}'s profile`} style={{ width: '100px', borderRadius: '50%' }} />
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Member since: {new Date(joinDate).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfileCard;
