import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { toast } from 'react-toastify';
import axios from 'axios';

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP}/auth/forgot_password`, {
        email,
        newpassword,
        answer   
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");  
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title={"Reset Password - E-commerce"}>
      <div className="form-container">
        <div className="glass-card w-full max-w-md shadow-2xl">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-8 text-center text-white tracking-tight">
              RESET PASSWORD
            </h1>

            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email" 
                className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                placeholder="name@company.com" 
                required 
              />
            </div>

            <div className="mb-6">
              <label htmlFor="answer" className="block mb-2 text-sm font-semibold text-gray-300">
                Security Question: Mother's Maiden Name?
              </label>
              <input 
                type="text" 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                id="answer" 
                className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                placeholder="Answer" 
                required 
              />
            </div>

            <div className="mb-8">
              <label htmlFor="newpassword" className="block mb-2 text-sm font-semibold text-gray-300">
                New Password
              </label>
              <input 
                type="password" 
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newpassword" 
                className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                placeholder="••••••••" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
            >
              RESET PASSWORD
            </button>
            
            <p className="mt-6 text-center text-gray-400 text-sm">
              Remember your password? <span onClick={() => navigate("/login")} className="text-[#6366f1] cursor-pointer hover:underline">Login</span>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Forgotpassword;