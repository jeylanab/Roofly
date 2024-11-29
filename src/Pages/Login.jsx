import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }
    
    // Handle actual login logic (e.g., API call)
    console.log('Logging in with:', email, password);
    
    // Reset error message on successful form submission
    setErrorMessage('');
    
    // Redirect or handle after login success
    // e.g., navigate to another page or set a user session
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>

        {/* Error message display */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
            </div>

            <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-800">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login