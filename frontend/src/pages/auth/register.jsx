import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/layout'
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const [email,setEmail]=useState("") 
  const [password,setPassword]=useState("")
  const [name,setName]=useState("") 
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post(`${import.meta.env.VITE_APP}/auth/register`, {
        email,
        password,
        name,
        phone,
        address
      });
      if(res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      toast.error("Registration failed!");
    }
  }

  return (
    <Layout 
      title={"Register"} 
      description={"Create a new account"} 
      keywords={"register, e-commerce"} 
      author={"Sharvari Kale"}
    >

      <div className="border-2 border-black max-w-md mx-auto mt-8 mb-20 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center p-6">

        <form onSubmit={handleSubmit} className="w-full">

          <div className="flex justify-center font-bold mb-8 text-xl text-white">
            <h1>REGISTER PAGE</h1>
          </div>

          {/* Name */}
          <div className="mb-4 text-white">
            <label className="block mb-1 text-sm">Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full bg-transparent border border-white text-white px-3 py-2 rounded placeholder-gray-300"
            />
          </div>

          {/* Email */}
          <div className="mb-4 text-white">
            <label className="block mb-1 text-sm">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full bg-transparent border border-white text-white px-3 py-2 rounded placeholder-gray-300"
            />
          </div>

          {/* Password */}
          <div className="mb-4 text-white">
            <label className="block mb-1 text-sm">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent border border-white text-white px-3 py-2 rounded placeholder-gray-300"
            />
          </div>

          {/* Phone + Address */}
          <div className="flex gap-4 mb-4 text-white">

            <div className="w-1/2">
              <label className="block mb-1 text-sm">Phone</label>
              <input 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full bg-transparent border border-white text-white px-3 py-2 rounded placeholder-gray-300"
              />
            </div>

            <div className="w-1/2">
              <label className="block mb-1 text-sm">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full bg-transparent border border-white text-white px-3 py-2 rounded placeholder-gray-300"
              />
            </div>

          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button 
              type="submit"
              className="text-white bg-gray-800 hover:bg-gray-500 border border-white px-4 py-2 rounded"
            >
              REGISTER
            </button>
          </div>

        </form>

      </div>

    </Layout>
  )
}

export default Register