import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { LoginContext } from "../context/Login/Login";

function Profile() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setPhoneNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword , setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { token,userOpject } = useContext(LoginContext);
  const userID = localStorage.getItem("userId");

  
  useEffect(() => {
       
        
        const { email, firstName, lastName, mobileNumber } = userOpject;
        setEmail(email || "");
        setFirstName(firstName || "");
        setLastName(lastName || "");
        setPhoneNumber(mobileNumber || "");
     
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();
    setSuccessMessage("");

    if (firstName.trim() === "" || firstName.length < 4) {
      setFirstNameError("First name should be more than 3 characters.");
      return;
    }
    if (lastName.trim() === "" || lastName.length < 4) {
      setLastNameError("Last name should be more than 3 characters.");
      return;
    }
    if (mobileNumber.trim() === "" || mobileNumber.length < 10) {
      setPhoneNumberError("Phone number should be at least 10 digits.");
      return;
    }
    
    try {
      const response = await axios.patch(`https://restaurant-website-dusky-one.vercel.app/user/`, {
        firstName,
        lastName,
        mobileNumber,
       
      },
      {
        headers: {
          token: `resApp ${token}` 
        }
      }
    
    );
      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully!");
        localStorage.setItem("user",JSON.stringify(response.data.updatedUser))
        console.log(response);
        
      } else {
        setServerError("Error updating profile.");
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("An error occurred. Please try again.");
    }
  };

  const resetErrors = () => {
    setEmailError("");
    setFirstNameError("");
    setLastNameError("");
    setPhoneNumberError("");
    setServerError("");
    setSuccessMessage("");
  };

  const handleChangeEmail = async () => {
    if (!newEmail) {
      setEmailError("Email cannot be empty.");
      return;
    }

    try {
      const response = await axios.put("https://api.example.com/user/email", { email: newEmail });
      if (response.status === 200) {
        setEmail(newEmail);
        setSuccessMessage("Email updated successfully!");
        setShowEmailModal(false);
      } else {
        setServerError("Error updating email.");
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("An error occurred while updating email.");
    }
  };

  const handleChangePassword = async () => {
    
    if (!newPassword ) {
      setServerError("Password cannot be empty.");
      return;
    }
    
    try {
      const response = await axios.put("https://api.example.com/user/updatePassword", 
        { 
          
          newPassword  
          ,
        },
      
        {
          headers: {
            token: `resApp ${token}` 
          }
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Password updated successfully!");
        setShowPasswordModal(false);
      } else {
        setServerError("Error updating password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("An error occurred while updating password.");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[80%] lg:w-[60%] mx-auto flex flex-col gap-6 rounded border-b border-gray-300 pb-6"
      >
        {/* Email */}
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label htmlFor="email" className="w-full md:w-1/3 text-sm text-gray-700 mb-1 md:mb-0">
            Email
          </label>
          <input
            type="email"
            value={email}
            id="email"
            className="p-2 border border-blue-200 outline-none rounded w-full md:w-2/3 text-sm"
            
          />
        </div>

        {/* First Name */}
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label htmlFor="firstName" className="w-full md:w-1/3 text-sm text-gray-700 mb-1 md:mb-0">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            id="firstName"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded w-full md:w-2/3 text-sm"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <p className="text-red-500 md:ml-4">{firstNameError}</p>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label htmlFor="lastName" className="w-full md:w-1/3 text-sm text-gray-700 mb-1 md:mb-0">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            id="lastName"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded w-full md:w-2/3 text-sm"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <p className="text-red-500 md:ml-4">{lastNameError}</p>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label htmlFor="phoneNumber" className="w-full md:w-1/3 text-sm text-gray-700 mb-1 md:mb-0">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Phone Number"
            value={mobileNumber}
            id="phoneNumber"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded w-full md:w-2/3 text-sm"
            required
            onChange={(e) => setPhoneNumber(e.target.value.toString())}
          />
          {phoneNumberError && <p className="text-red-500 md:ml-4">{phoneNumberError}</p>}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
          <button
            type="button"
            className="text-green-500 text-base underline mb-2 sm:mb-0"
            onClick={() => setShowEmailModal(true)}
          >
            CHANGE EMAIL
          </button>
          <button
            type="button"
            className="text-green-500 text-base underline"
            onClick={() => setShowPasswordModal(true)}
          >
            CHANGE PASSWORD
          </button>
        </div>

        <button
          type="submit"
          className="btn bg-orange-500 text-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto py-2 text-lg rounded"
        >
          Update
        </button>

        {serverError && <p className="text-red-500 text-center">{serverError}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      </form>
{/* Email Modal */}
{showEmailModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md shadow-md w-1/2">
      <h3 className="text-orange-500 bg-gray-100 mb-0 p-3 rounded-t-md mb-2">
        Change Email
      </h3>
      <input
        type="password"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="Current Password"
        className="p-2 border border-blue-200 rounded w-full mb-4 focus:border-blue-500"
      />
       <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="New Email"
        className="p-2 border border-blue-200 rounded w-full mb-4 focus:border-blue-500"
      />
      {emailError && <p className="text-red-500">{emailError}</p>}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setShowEmailModal(false)}
          className="bg-white text-green-500 border border-green-500 rounded w-48 p-2"
        >
          Cancel
        </button>
        <button
          onClick={handleChangeEmail}
          className="bg-green-500 text-white p-2 rounded w-48 ml-4"
        >
          Update Email
        </button>
      </div>
    </div>
  </div>
)}

   {/* Password Modal */}
{showPasswordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md shadow-md w-1/2">
      <h3 className="text-orange-500 bg-gray-100 p-3  mb-4 font-DM Serif Display">Change Password</h3> 
      
      <input
        type="password"
        value={newPassword }
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Current Password"
        className="p-2 border border-blue-200 rounded w-full mb-4"
      />
      <input
        type="password"
        placeholder="New Password"
        className="p-2 border border-blue-200 rounded w-full mb-4"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="p-2 border border-blue-200 rounded w-full mb-4"
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setShowPasswordModal(false)}
          className="bg-white text-green-500 border border-green-500 rounded w-48 p-2"
        >
          Cancel
        </button>
        <button
          onClick={handleChangePassword}
          className="bg-green-500 text-white p-2 rounded w-48 ml-4" 
        >
          Update
        </button>
      </div>
    </div>
  </div>

      )}
    </div>
  );
}

export default Profile;
