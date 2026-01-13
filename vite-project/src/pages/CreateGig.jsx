import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import React from "react";
const CreateGig = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/gigs", {
        title,
        description,
        budget,
      });
      alert("Gig created successfully");
      navigate("/gigs");
    } catch (error) {
      alert("Failed to create gig");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create a New Gig
        </h2>

        <input
          type="text"
          placeholder="Gig title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Gig description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Budget (₹)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Create Gig
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
