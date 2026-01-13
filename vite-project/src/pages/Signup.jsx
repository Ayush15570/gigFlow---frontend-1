import React from 'react'
import api from '../api/axios'
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
const Signup = () => {
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register",{
                name,
                email,
                password
            })
            navigate("/login")
        } catch (error) {
            alert("Signup failed")
        }
    }
    const handle = () => {
        navigate("/login")
    }
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create your GigFlow account
      </h2>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
      >
        Sign Up
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
);

}

export default Signup
