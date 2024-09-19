import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserProfileCard';
import { getUserProfile } from '../services/UserService';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(1); // Assuming the user ID is 1
        setUserData(response.data); // Assuming the response data is an object
        setLoading(false);
      } catch (error) {
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>AfriMind</h2>
        <ul>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Mental Health Resources</li>
          <li>Sessions</li>
          <li>Support</li>
        </ul>
      </nav>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>Welcome to AfriMind Dashboard</h1>
        </header>

        <section className="dashboard-section">
          {userData ? (
            <UserProfileCard user={userData} />
          ) : (
            <div>No user data available</div>
          )}
        </section>

        <section className="content-section">
          <h2>Your Sessions</h2>
          <div className="sessions-list">
            <p>No sessions yet. Schedule one today!</p>
          </div>
        </section>

        <div className="additional-content">
          <h2>Latest Mental Health Content</h2>
          <p>This is where the mental health content will be displayed.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
