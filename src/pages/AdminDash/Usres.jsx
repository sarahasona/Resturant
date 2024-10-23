import React, { useState, useEffect, useContext } from "react";
import UserCard from "./UserCard";
import Confirm from "./Confirm";
import axios from "axios";
import { LoginContext } from "../../context/Login/Login";

function Users() {
  const [showc, setShowC] = useState(false);
  const [users, setUsers] = useState([]);
  const { token } = useContext(LoginContext);
  const [delet, setDelet] = useState("");
  const [refresh, setRefresh] = useState(true);

  const allU = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/user/allUsers/`, {
        headers: {
          token: `resApp ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    allU().then((data) => {
      if (data && Array.isArray(data.usersData)) {
        setUsers(data.usersData);
      } else {
      }
    });
  }, [refresh]);

  return (
    <div
      className="overflow-y-scroll scrollbar-hidden h-[90vh]"
      style={{ scrollbarWidth: "none" }}
    >
      {showc && (
        <Confirm
          setShowC={setShowC}
          delet={delet}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}

      <div className="flex justify-between w-[80%] m-[5%] p-2 border bg-blue-50">
        <h3>#</h3>
        <h3>Name</h3>
        <h3>Email</h3>
        <h3>Role</h3>
        <h3>Action</h3>
      </div>
      {users.length > 0 ? (
        users.map((user, index) => (
          <UserCard
            setDelet={setDelet}
            id={user._id}
            key={user._id}
            user={user}
            order={index}
            name={user.firstName + " " + user.lastName}
            role={user.role}
            email={user.email}
            setShowC={setShowC}
          />
        ))
      ) : (
        <p>No users found or loading...</p>
      )}
    </div>
  );
}

export default Users;
