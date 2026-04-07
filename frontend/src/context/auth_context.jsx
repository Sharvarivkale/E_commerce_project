import { createContext, useState, useContext,useEffect } from "react";

const Authcontext = createContext();

const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState({
    user: null,
    token: ""
  });

  

  return (
    <Authcontext.Provider value={{ Auth, setAuth }}>
      {children}
    </Authcontext.Provider>
  );
};

const useAuth = () => {
  return useContext(Authcontext);
};

export { useAuth, AuthProvider };