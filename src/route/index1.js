import About from "../pages/About";
import Home from "../pages/Home";
import { Navigate } from "react-router-dom";
export default [
  // 路由表
  { path: "/about", element: <About /> },
  { path: "/home", element: <Home /> },
  { path: "/", element: <Navigate to="/about" /> },
];
