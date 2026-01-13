import { useNavigate } from "react-router-dom";
import React from "react";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gray-100 py-32">
      <div className="text-center bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to GigFlow
        </h1>
        <p className="text-gray-600 mb-6">
          Find gigs or hire freelancers in minutes.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Explore Gigs
        </button>
      </div>
    </div>
  );
};

export default Home;
