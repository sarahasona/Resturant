import React, { useState } from 'react'
import UserCard from './UserCard'
import Confirm from './confirm';

const users = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    order: 1,
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    order: 2,
  },
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Moderator',
    order: 3,
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'User',
    order: 4,
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Admin',
    order: 5,
  },
  {
    name: 'Daniel Wilson',
    email: 'daniel.wilson@example.com',
    role: 'User',
    order: 6,
  },
  {
    name: 'Olivia White',
    email: 'olivia.white@example.com',
    role: 'Moderator',
    order: 7,
  },
  {
    name: 'James Taylor',
    email: 'james.taylor@example.com',
    role: 'User',
    order: 8,
  },
  {
    name: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    role: 'Admin',
    order: 9,
  },
  {
    name: 'Liam Anderson',
    email: 'liam.anderson@example.com',
    role: 'User',
    order: 10,
  },
];

function Usres() {
  const[showc,setShowC]=useState(false)

  return (
  

    <div className="overflow-y-scroll scrollbar-hidden h-[90vh] "
    style={{scrollbarWidth : 'none'}}
    >
      {
        showc &&
        (
          <Confirm 
          setShowC={setShowC}
          />
        )
      }
      <div className='flex justify-between w-[80%] m-[5%] p-2 border bg-blue-50 '>
      <h3>#</h3>
      <h3> name </h3>
      <h3>email </h3>
      <h3> role</h3>
      <h3>action </h3>
    </div>
     {users.map((user, index) => (
        <UserCard 
          setShowC={setShowC}
          key={index} 
          name={user.name}
          email={user.email}
          role={user.role}
          order={user.order}
        />
      ))}
    </div>
  )
}

export default Usres
