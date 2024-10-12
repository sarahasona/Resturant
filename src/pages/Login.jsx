import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/Login/Login";
import "./login/login.css";

function Login() {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    resetErrors();

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Check password length
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    // Check if user data exists
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const exist = userData.find(
        (user) => user.email === email && user.password === password
      );
      if (!exist) {
        setPasswordError("Email or password is incorrect");
      } else {
        login(exist.firstName); // Assuming you're storing firstName in userData
        navigate("/");
      }
    } else {
      setPasswordError("No user found. Please sign up.");
    }
  };

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container mx-auto px-4 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[60%] lg:w-[50%] mx-auto flex flex-col gap-[30px] border py-[30px] px-[20px] md:px-[50px] mt-[50px] md:mt-[80px] rounded shadow-md form-control"
      >
        {/* Email */}
        <div className="formgroup flex flex-col">
          <label htmlFor="email" className="mb-2">Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="text-red-500">{emailError}</div>}
        </div>

        {/* Password */}
        <div className="formgroup flex flex-col">
          <label htmlFor="password" className="mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot-password" className="text-sm float-left mt-6 mb-4">
            Forgot Password?
          </Link>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn bg-orange-950 text-white w-[50%] mx-auto py-2 rounded"
        >
          Login
        </button>

        <p className="text-center">
          <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
