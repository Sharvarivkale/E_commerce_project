import React,{ useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/layout'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useAuth } from '../../context/auth_context';

const Login = () => {
       const [email,setEmail]=useState("") 
        const [password,setPassword]=useState("")
        const [auth,setAuth]=useAuth();

        const navigate = useNavigate();
      const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post(`${import.meta.env.VITE_APP}/auth/login`, {
        email,
        password
      }); 
      
      if(res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify({
          ...auth,
          user: res.data.user,
          token: res.data.token
        }));
        
        navigate("/");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("Login failed!");
    }
  }

  return (
    <Layout 
      title={"Login"} 
      description={"Access your account"} 
      keywords={"login, e-commerce"} 
      author={"Sharvari Kale"} 
    >
        

      <div className="border-2 border-black h-[400px] max-w-md mx-auto mt-20 mb-20 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">

        <form onSubmit={handleSubmit} className="w-full px-6">

          <div className="flex justify-center items-center font-bold mb-8 text-xl text-white">
            <h1>LOGIN PAGE</h1>
          </div>

          <div className="mb-5 text-white">
            <label htmlFor="email-alternative" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input 
              type="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email-alternative" 
              className="mb-6 bg-transparent border border-white text-white rounded px-3 py-2 w-full placeholder-gray-300"
              placeholder="name@email.com" 
              required 
            />
          </div>

          <div className="mb-5 text-white">
            <label htmlFor="password-alternative" className="block mb-2 text-sm font-medium">
              Your password
            </label>
            <input 
              type="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password-alternative" 
              className="mb-6 bg-transparent border border-white text-white rounded px-3 py-2 w-full placeholder-gray-300"
              placeholder="••••••••" 
              required 
            />
          </div>

          <div className="flex justify-center">
            <button 
              type="submit" 
              className="text-white bg-gray-800 hover:bg-gray-500 border border-white px-4 py-2 rounded"
            >
              LOGIN
            </button>
          </div>

        </form>

      </div>

    </Layout>
  )
}

export default Login