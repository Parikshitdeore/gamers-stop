import React, { useContext} from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

export default function Auth({children}) {
    let location=useLocation()
    const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{from:location}} />
  );
}
