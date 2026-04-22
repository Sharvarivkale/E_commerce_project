import React,{ useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import Layout from '../../components/layout/layout'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useAuth } from '../../context/auth_context';

const Login = () => {
       const [email,setEmail]=useState("") 
        const [password,setPassword]=useState("")
        const [auth,setAuth]=useAuth();

        const navigate = useNavigate();
      const location = useLocation();
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

        navigate(location.state?.from || "/");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("Login failed!");
    }
  }

  return (
    <Layout 
      title={"Login - E-commerce"} 
      description={"Access your account"} 
      keywords={"login, e-commerce"} 
      author={"Sharvari Kale"} 
    >
      <div className="form-container">
        <div className="glass-card w-full max-w-md shadow-2xl">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-8 text-center text-[#6366f1] tracking-tight">
              WELCOME BACK
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

            <div className="mb-8">
              <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-300">
                Password
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password" 
                className="w-full bg-[#121212] border border-[#374151] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#6366f1] transition-colors"
                placeholder="••••••••" 
                required 
              />
            </div>

            <div className="flex flex-col gap-4">
              <button 
                type="submit" 
                className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
              >
                LOGIN
              </button>
              <button 
                type="button" 
                className="w-full bg-transparent border border-[#374151] hover:bg-[#374151] text-gray-300 py-2 rounded-lg transition-colors text-sm"
                onClick={() => navigate("/forgot_password")}
              >
                Forgot Password?
              </button>
            </div>
            
            <p className="mt-6 text-center text-gray-400 text-sm">
              Don't have an account? <span onClick={() => navigate("/register")} className="text-[#6366f1] cursor-pointer hover:underline">Register</span>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login