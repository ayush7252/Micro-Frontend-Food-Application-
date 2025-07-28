import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    return <Navigate to="/landingpage" replace />;
  }

  const user = JSON.parse(storedUser);
  if (user.role !== "admin") {
    return <Navigate to="/homepage" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
