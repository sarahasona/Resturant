import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../pages/signup/signup.css"
function SignUp() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setfirstNameError("");
    setlastNameError("");
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // validate Inputs
    resetErrors();
    if (password != confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password length should be at least 8 character");
    }
    if (firstName.trim == "" || firstName.length < 4) {
      setfirstName("Username length should be more than 3 character");
      return;
    }
    if (lastName.trim == "" || lastName.length < 4) {
        setlastName("Username length should be more than 3 character");
        return;
      }
    if (email.trim == "" || !validateEmail()) {
      console.log("please Enter Valid Email");
      setEmailError("Please Enter valid Email");
    }
    // save data and redirect to login form
    // check if email exists before
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const exist = userData.find((user) => user.email == email);
      if (exist) {
        setEmailError("Email already exists");
        return;
      } else {
        userData.push({ email, firstName,lastName, password });
      }
    } else {
      localStorage.setItem(
        "userData",
        JSON.stringify([{ email, password, firstName,lastName }])
      );
    }
    navigate("/login", { replace: true });
  };
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  return (
    <div className="container mx-auto px-4 md:px-8 ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 rounded  ">Create an Account</h2>
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto flex flex-col gap-4 py-6 px-6 md:px-8 mt-6 rounded shadow-md form-control" method="POST" action="#"
    >
      {/* User Name */}
      <div className="form group flex flex-col">
        <label htmlFor="username" className="mb-2">
          First Name
        </label>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          id="firstName"
          className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
          required
          onChange={(e) => setfirstName(e.target.value)}
        />
        {firstNameError && <p className="text-red-500">{firstNameError}</p>}
      </div>
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
          onChange={(e) => setlastName(e.target.value)}
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
      <div className="form group flex flex-col">
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
        className="btn bg-white-950 text-white w-[50%] mx-auto py-2 rounded "
        
      >
        <Link to="/" >        
        Sign Up
        </Link>
      </button>
      <p className="text-center mt-[5px]">
        Already have an account?{" "}
        <Link to="/login" className="login-word" >
          Login
        </Link>
      </p>
    </form>
    </div>
  );
}

export default SignUp;
