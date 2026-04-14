import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth_context'
import axios from 'axios';
import Spinner from '../components/others/Spinner';
import { Outlet } from 'react-router-dom';

function AdminPrivateRoute(){
  const [auth, setAuth] = useAuth();
  const [ok, setok] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('/auth/admin_auth');
        if (res.data.ok) {
          setok(true);
        } else {
          setok(false);
        }
      } catch (error) {
        setok(false);
      }
    }
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner  />;
}
export { AdminPrivateRoute };
