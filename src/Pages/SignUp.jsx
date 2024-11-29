import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSignUp = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Reset error message on success
    setErrorMessage('');
    
    // Simulate a successful signup (e.g., calling an API)
    setSuccessMessage('Account created successfully!');
    
    // Handle actual sign-up logic here (e.g., API call)
    console.log('User Info:', { name, email, password });

    // Clear form fields after submission
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Sign Up</h2>

        {/* Success or Error Message */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter your full name"
            />
          </div>

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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-800">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
