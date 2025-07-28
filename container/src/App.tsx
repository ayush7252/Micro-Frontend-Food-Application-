import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import Publicroute from "Publicroute";
import AdminRoute from "./Adminroute";
const Homepage = lazy(() => import("homepage/homepage"));
const Login = lazy(() => import("loginpage/loginpage"));
const Signup = lazy(() => import("signuppage/signuppage"));
const Navbar = lazy(() => import("navbar/navbar"));
const Footer = lazy(() => import("footer/footer"));
const Contactpage = lazy(() => import("contactpage/contactpage"));
const Cart = lazy(() => import("cart/cart"));
const Landingpage = lazy(() => import("landingpage/landingpage"));
const Resturants = lazy(() => import("resturants/resturants"));
const Adminpage = lazy(() => import("adminpage/adminpage"));
const Profilepage = lazy(() => import("profilepage/profilepage"));

function App() {
  useEffect(() => {
    console.log("App");
  }, []);

  const AppWapper = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      return <Navigate to="/landingpage" />;
    }
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const HomeWapper = () => {
    return (
      <>
        <Navbar />
        <Landingpage />
        <Footer />
      </>
    );
  };
  return (
    <Router>
      <>
        {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/navbar">Navbar</Link>
              </li>
              <li>
                <Link to="/homepage">Homepage</Link>
              </li>
            </ul>
          </nav> */}

        <Routes>
          <Route element={<Publicroute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/guestuser"
              element={<Navigate to="/landingpage" replace />}
            />
          </Route>

          <Route path="/landingpage" element={<HomeWapper />} />
          <Route element={<AppWapper />}>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/contact" element={<Contactpage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/resturants" element={<Resturants />} />
            <Route element={<AdminRoute />}>
              <Route path="/adminpage" element={<Adminpage />} />
            </Route>
            <Route path="/profile" element={<Profilepage />} />
            <Route path="/" element={<Navigate to="/homepage" replace />} />
          </Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
