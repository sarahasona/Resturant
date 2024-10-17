import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function SavedAddresses() {
  const [addresses, setAddresses] = useState([
    { id: 1, address: "100 Elbahr St", phone: "01022999999" },
    { id: 2, address: "200 MN St", phone: "01022999988" }
  ]);
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [deleteId, setDeleteId] = useState(null); 

  const openModal = (content, id = null) => {
    setModalContent(content);
    if (content === "delete") {
      setDeleteId(id); 
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
    setDeleteId(null); 
  };

  const handleAddAddress = () => {
    if (newAddress.trim() === "" || newPhone.trim() === "") return;

    const newEntry = { id: Date.now(), address: newAddress, phone: newPhone };
    setAddresses([...addresses, newEntry]);
    setNewAddress("");
    setNewPhone("");
    closeModal();
  };

  const handleEditAddress = (id) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    setNewAddress(addressToEdit.address);
    setNewPhone(addressToEdit.phone);
    setIsEditing(true);
    setEditId(id);
    openModal("edit");
  };

  const handleSaveEdit = () => {
    const updatedAddresses = addresses.map((address) =>
      address.id === editId ? { ...address, address: newAddress, phone: newPhone } : address
    );
    setAddresses(updatedAddresses);
    setNewAddress("");
    setNewPhone("");
    setIsEditing(false);
    setEditId(null);
    closeModal();
  };

  const handleDeleteAddress = () => {
    const updatedAddresses = addresses.filter((address) => address.id !== deleteId); 
    setAddresses(updatedAddresses);
    closeModal();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-end mb-4">
        <button
          className="text-green-500 flex items-center space-x-1"
          onClick={() => openModal("add")}
        >
          <IoMdAddCircleOutline className="text-green-500" />
          <span>Add Address</span>
        </button>
      </div>

      <div className="bg-white p-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="mb-4 flex justify-between items-center border-b border-gray-200 pb-4"
          >
            <div>
              <p className="font-semibold">Address: <span className="font-normal">{address.address}</span></p>
              <p className="text-gray-600 font-semibold">Mobile Number: <span className="font-normal">{address.phone}</span></p>
            </div>
            <div className="space-x-2">
              <button
                className="text-green-500 border-none"
                onClick={() => handleEditAddress(address.id)}
              >
                Edit
              </button>
              <button
                className="text-gray-500 border-none"
                onClick={() => openModal("delete", address.id)} 
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h3 className="text-xl mb-4">
              {modalContent === "edit" ? "Edit Address" : 
               modalContent === "delete" ? "Delete Address" : 
               "Add New Address"}
            </h3>
            {modalContent !== "delete" ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="border p-2 mb-4 w-full"
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={isEditing ? handleSaveEdit : handleAddAddress}
                >
                  {isEditing ? "Save Changes" : "Add Address"}
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p>Are you sure you want to delete this address?</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2 mt-4"
                  onClick={handleDeleteAddress} 
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedAddresses;
