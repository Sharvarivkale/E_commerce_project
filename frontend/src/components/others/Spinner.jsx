import React, { useEffect, useState } from 'react'
import {useNavigate,useLocation} from "react-router-dom"


const Spinner = () => {
  const [count,setCount]=useState(5)
  const navigate = useNavigate();
  const location =useLocation();



useEffect(() => {
  const interval = setInterval(() => {
    setCount((prevCount) => prevCount - 1);
  }, 1000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  if (count === 0) {
    navigate("/login", {
      state: { from: location }
    });
  }
}, [count, navigate, location]);

  return (
    <>

    <div className="d-flex flex-col justify-content-center align-items-center vh-100 text-white">
      <h1>Redirecting in {count} seconds...</h1>
   <div className="spinner-border text-white m-5 " role="status">
  <span className="visually-hidden">Loading...</span>
</div>
</div>

    </>
  )
}

export default Spinner