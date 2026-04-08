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
    
  <Layout title={"Forgot Password"}>

    <div className="border-2 border-black max-w-md mx-auto mt-12 mb-20 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center p-6">

      <form onSubmit={handleSubmit} className="w-full">

        <div className="flex justify-center font-bold mb-8 text-xl text-white">
          <h1>FORGOT PASSWORD</h1>
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
            required
          />
        </div>

        {/* New Password */}
        <div className="mb-4 text-white">
          <label className="block mb-1 text-sm">New Password</label>
          <input 
            type="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full bg-transparent border border-white text-white px-3 py-2 rounded placeholder-gray-300"
            required
          />
        </div>

        {/* Answer */}
        <div className="mb-4 text-white">
          <label className="block mb-1 text-sm">
            What is your mother’s maiden name?
          </label>
          <input 
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full bg-transparent border border-white text-white px-3 py-2 rounded placeholder-gray-300"
            required
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button 
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-500 border border-white px-4 py-2 rounded"
          >
            RESET PASSWORD
          </button>
        </div>

      </form>

    </div>

  </Layout>
);
};

export default Forgotpassword;