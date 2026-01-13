import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import React from "react";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.status);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
       
        <h2 className="text-xl font-bold text-gray-800">
          GigFlow
        </h2>

       
        <nav className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
              <Link
                to="/"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
