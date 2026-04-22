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
  const [answer,setAnswer]=useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post(`${import.meta.env.VITE_APP}/auth/register`, {
        email,
        password,
        name,
        phone,
        address,
        answer
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
      title={"Register - E-commerce"} 
      description={"Create a new account"} 
      keywords={"register, e-commerce"} 
      author={"Sharvari Kale"}
    >
      <div className="form-container">
        <div className="glass-card w-full max-w-lg shadow-2xl my-8">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-8 text-center text-[#6366f1] tracking-tight">
              CREATE ACCOUNT
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-300">Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-300">Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Password */}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-300">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-300">Phone</label>
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 890"
                  className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Answer */}
            <div className="mt-4 mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-300">Security Question: Mother's Maiden Name?</label>
              <input 
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
                className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-8">
              <label className="block mb-2 text-sm font-semibold text-gray-300">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                rows="3"
                className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors resize-none"
                required
              />
            </div>

            {/* Button */}
            <button 
              type="submit"
              className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
            >
              REGISTER
            </button>
            
            <p className="mt-6 text-center text-gray-400 text-sm">
              Already have an account? <span onClick={() => navigate("/login")} className="text-[#6366f1] cursor-pointer hover:underline">Login</span>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register