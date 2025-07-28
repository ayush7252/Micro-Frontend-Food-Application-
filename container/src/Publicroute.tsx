import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function Publicroute() {
  const user = localStorage.getItem("user");
  return user ? <Navigate to="/homepage" /> : <Outlet />;
}

export default Publicroute