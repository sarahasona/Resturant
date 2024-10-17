import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import Confirm from './Confirm';
import axios from 'axios';

function Users() {
  const [showc, setShowC] = useState(false);
  const [users, setUsers] = useState([]);

  const allU = async () => {
    try {
      const response = await axios.get(
        `https://restaurant-website-dusky-one.vercel.app/user/allUsers/`,
        {
          headers: {
            token: `resApp eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBkOTRjMTg2ODVjNzNjODQ0ZmVkZTMiLCJzZXNzaW9uSWQiOiI5NWM2OTJlOC1lZjg5LTQ2Y2MtYWVhNC1hMDZiZjUxZDJhMDYiLCJpYXQiOjE3MjkxNjc4NzIsImV4cCI6MTczMDM3NzQ3Mn0.o_FeXWK-rLSaEWfg9LVASoZxgHvN7wo9e40dtc6JAh8` 
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    allU().then((data) => {
      if (data && Array.isArray(data.usersData)) {
        setUsers(data.usersData); 
        console.log(users);
        
      } else {
        console.error("Expected an array but received:", data);
      }
    });
  }, []);

  return (
    <div className="overflow-y-scroll scrollbar-hidden h-[90vh]" style={{ scrollbarWidth: 'none' }}>
      {showc && <Confirm setShowC={setShowC} />}
      <div className='flex justify-between w-[80%] m-[5%] p-2 border bg-blue-50'>
        <h3>#</h3>
        <h3>Name</h3>
        <h3>Email</h3>
        <h3>Role</h3>
        <h3>Action</h3>
      </div>
      {users.length > 0 ? (
        users.map((user, index) => (
          <UserCard
          id={user._id}
           key={user._id}
           user={user} 
           order={index}
           name={user.firstName + " "+user.lastName}
           role={user.role}
           email={user.email}
           setShowC={setShowC} />
        ))
      ) : (
        <p>No users found or loading...</p>
      )}
    </div>
  );
}

export default Users;
