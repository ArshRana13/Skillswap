import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../hooks/loginAuth";
import bgImage1 from "../images/bgImage2.jpg";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      console.log(email, password);
      
      const userData = await loginAuth(email, password);
      console.log("User Logged In:", userData);
      
      // Example: Store token & navigate to dashboard
      //localStorage.setItem("token", userData.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="relative h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage1})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Text Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Login to SkillSwap</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 font-bold"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-400">
            Don't have an account? <button onClick={() => navigate("/signup")} className="text-blue-500 hover:underline">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
