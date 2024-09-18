import React, { useEffect, useState } from 'react';
import UserProfileCard from './UserProfileCard'; // Import the presentational component
import { getUserProfile } from './UserService'; // Assuming you have a service to fetch user data

const UserProfileContainer = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(1); // Fetch user data
        if (response.status === 200 && response.data) {
          setUserData(response.data); // Set actual user data
        } else {
          // Use fallback dummy data if user not found
          setUserData({
            name: 'John Doe',
            email: 'john.doe@example.com',
            joinDate: '2023-09-18',
            profileImage: '/path/to/profile-image.jpg',
          });
          setError('User not found, showing default data.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load user data, showing default data.');
        // Set dummy data in case of error
        setUserData({
          name: 'John Doe',
          email: 'john.doe@example.com',
          joinDate: '2023-09-18',
          profileImage: '/path/to/profile-image.jpg',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>{error}</p>
        {/* Pass user data to the UserProfileCard component */}
        <UserProfileCard 
          name={userData.name}
          email={userData.email}
          joinDate={userData.joinDate}
          profileImage={userData.profileImage}
        />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <UserProfileCard 
        name={userData.name}
        email={userData.email}
        joinDate={userData.joinDate}
        profileImage={userData.profileImage}
      />
    </div>
  );
};

export default UserProfileContainer;
