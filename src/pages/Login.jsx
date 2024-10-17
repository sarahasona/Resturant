import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/Login/Login";
import "./login/login.css";
import axios from "axios";

function Login() {
  const { login } = useContext(LoginContext);
  const { setAdmin } = useContext(LoginContext);

  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();
    setSuccessMessage("");
    setIsLoading(true);
    setSuccessMessage("");

    

    try {
      const response = await axios.post(
        "https://restaurant-website-dusky-one.vercel.app/user/signIn/",
        { identifier, password }
      );
    
      
      if (response.data.user.role ==="Admin"){
        setAdmin(true);
    
        
      }else{
        setAdmin(false);
      }

      if (response.status === 200) {
        const { token } = response.data;

        if (!token) {
          setServerError("Token not received. Please try again.");
          setIsLoading(false);
          return;
        }

        sessionStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        login(identifier);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", response.data.user._id);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        login(identifier);

        setSuccessMessage("Login successful! Welcome back!");

        setTimeout(() => {
          navigate("/");
        }, 700);
        }, 700);
      } else {
        setServerError("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Error caught:", error);
      console.log("Error response data:", error.response?.data);

      if (error.response) {
        if (error.response.status === 401) {
          setServerError("Invalid identifier or password.");
        } else {
          setServerError(
            `Error: ${error.response.data.message || "An unexpected error occurred."}`
          );
        }
      } else if (error.request) {
        setServerError("No response from server. Please check your network.");
      } else {
        setServerError("Error: Failed to send request.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetErrors = () => {
    setIdentifierError("");
    setPasswordError("");
    setServerError("");
    setSuccessMessage("");
  };
  

  return (
    <div className="container mx-auto px-4 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[60%] lg:w-[50%] mx-auto flex flex-col gap-[30px] border py-[30px] px-[20px] md:px-[50px] mt-[50px] md:mt-[80px] rounded shadow-md form-control"
      >
        {/* Identifier */}
        <div className="formgroup flex flex-col">
          <label htmlFor="identifier" className="mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="identifier"
            className="p-2 border border-blue-200 focus:border-blue-500 outline-none rounded"
            required
            onChange={(e) => setIdentifier(e.target.value)}
          />
          {identifierError && (
            <div className="text-red-500">{identifierError}</div>
          )}
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
          <Link to="/forgot-password" className="text-sm float-left mt-6 mb-4">
            Forgot Password?
          </Link>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>

        {serverError && <p className="text-red-500">{serverError}</p>}

        {successMessage && <p className="text-green-500">{successMessage}</p>} 
        {/* Success Message */}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button
          type="submit"
          className="btn bg-orange-500 text-white w-[50%] mx-auto py-2 rounded flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i> 
            </>
          ) : (
            'Login'
          )}
        </button>

        <p className="text-center text-lg">
          Don't have an account?{" "}
          <Link to="/signup" className="text-lg text-orange-500">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
