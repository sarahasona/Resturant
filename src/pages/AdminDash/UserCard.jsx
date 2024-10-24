import React from "react";

function UserCard(data, setShowC, setDelet) {
  function delet() {
    if (data.role != "Admin") {
      data.setShowC(true);

      data.setDelet(data.id);
    }
  }

  return (
    <div
      className=' "
'
    >
      <div className="flex justify-between w-[80%] m-[5%] p-2 border">
        <p className="text-primary-hover">{data.order}</p>
        <p>{data.name}</p>
        <p className="text-primary-hover">{data.email}</p>
        <p>{data.role}</p>
        <button className="text-primary-hover">
          <i className="fa-solid fa-user-slash" onClick={delet}></i>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
