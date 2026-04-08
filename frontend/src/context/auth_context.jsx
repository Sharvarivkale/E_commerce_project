import axios from "axios";
import { useState,createContext,useContext, useEffect } from "react";

const AuthContext=createContext();

const AuthProvider=({children})=>{
  const [auth,setAuth]=useState({
    user:null,
    token:""
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.baseURL = import.meta.env.VITE_APP;

  useEffect(()=>{
    const data=localStorage.getItem("auth");
    if(data){
      const parsedData=JSON.parse(data);
      setAuth({
        ...auth,
        user:parsedData.user,
        token:parsedData.token
      });
    }
    //eslint-disable-next-line
  },[])

  return(
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

export {AuthProvider,useAuth};