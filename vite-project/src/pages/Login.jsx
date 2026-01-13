import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import api from '../api/axios'
import { login } from '../store/authSlice'
import { useState } from 'react'
import { socket } from '../api/socket';
const Login = () => {
 
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login",{
                email,
                password
            })

            const user = res.data.user
            dispatch(login(user))
            
            navigate('/gigs')
        } catch (error) {
            alert("Invalid email or password")
        }
    }
 return (
    <div className="flex justify-center bg-gray-100 py-20">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <input 
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input 
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
