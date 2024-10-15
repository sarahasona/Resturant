import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import Axios
import "../pages/signup/signup.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    setLastNameError("");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();

    // Validate Inputs
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password length should be at least 8 characters");
      return;
    }
    if (firstName.trim() === "" || firstName.length < 4) {
      setFirstNameError("First name should be more than 3 characters");
      return;
    }
    if (lastName.trim() === "" || lastName.length < 4) {
      setLastNameError("Last name should be more than 3 characters");
      return;
    }
    if (email.trim() === "" || !validateEmail()) {
      setEmailError("Please enter a valid email");
      return;
    }

    try {
      const response = await axios.post("https://restaurant-website-dusky-one.vercel.app/user/signUp/", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("User created:", response.data);
      
      navigate("/", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setEmailError("Email already exists");
      } else {
        setEmailError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container items-center mx-auto px-4 md:px-8">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 rounded">
        Create an Account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto flex flex-col gap-4 py-6 px-6 md:px-8 mt-6 rounded shadow-md form-control"
      >
        {/* First Name */}
        <div className="formgroup flex flex-col">
          <label htmlFor="firstName" className="mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            id="firstName"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <p className="text-red-500">{firstNameError}</p>}
        </div>

        {/* Last Name */}
        <div className="formgroup flex flex-col">
          <label htmlFor="lastName" className="mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            id="lastName"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <p className="text-red-500">{lastNameError}</p>}
        </div>

        {/* Email */}
        <div className="formgroup flex flex-col">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>

        {/* Password */}
        <div className="formgroup flex flex-col">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>

        {/* Confirm Password */}
        <div className="formgroup flex flex-col">
          <label htmlFor="confirm" className="mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="confirm"
            id="confirm"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <p className="text-red-500">{confirmPasswordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn bg-orange-950 text-white w-[50%] mx-auto py-2 rounded"
        >
          Sign Up
        </button>
        <p className="text-center mt-[5px]">
          Already have an account?{" "}
          <Link to="/login" className="login-word">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
