import React, { useState } from 'react';
import Lottie from 'lottie-react';
import signupAnimation from '../assets/lottie/Login Leady.json'; // adjust if needed

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e : any) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://foodapp-backend-a3ew.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();

      if (data.status === 201) {
        console.log('Signup successful:', data);

        // ✅ Store user in localStorage
        localStorage.setItem('user', JSON.stringify(data));

        alert(`Welcome ${data.username}!`);
        // Example: window.location.href = '/login';

      } else {
        throw new Error('Something went wrong during signup');
      }

    } catch (err : any) {
      console.error(err);
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }

    // Reset form
    setFormData({
      username: '',
      email: '',
      phone: '',
      password: '',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl">
        {/* Lottie Animation */}
        <div className="flex justify-center items-center p-6 md:w-1/2 bg-blue-50">
          <Lottie animationData={signupAnimation} className="w-64 h-64" loop />
        </div>

        {/* Form */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
