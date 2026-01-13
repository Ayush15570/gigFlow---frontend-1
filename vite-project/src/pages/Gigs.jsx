import { useEffect, useState } from "react";
import api from "../api/axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGig, setActiveGig] = useState(null);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate()
  const fetchGigs = async () => {
    const res = await api.get("/gigs", {
      params: { search },
    });
    setGigs(res.data);
  };

  useEffect(() => {
    fetchGigs();
  }, [search]);

  const handleSubmitBid = async (gigId) => {
    try {
      await api.post("/bids", {
        gigId,
        message,
        price,
      });
      alert("Bid submitted");
      setActiveGig(null);
      setMessage("");
      setPrice("");
    } catch {
      alert("Failed to submit bid");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Available Gigs
        </h2>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/create-gig")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Create Gig
          </button>

          <button
            onClick={() => navigate("/my-gigs")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            My Gigs
          </button>
        </div>
      </div>



      <input
        type="text"
        placeholder="Search gigs by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {gigs.length === 0 && (
        <p className="text-gray-500 text-center">No gigs found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <h3
              onClick={() => setActiveGig(gig._id)}
              className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
            >
              {gig.title}
            </h3>

            <p className="text-gray-700 mt-2">{gig.description}</p>

            <div className="mt-3 text-sm text-gray-600">
              <p>
                <span className="font-medium">Budget:</span> ₹{gig.budget}
              </p>
              <p>
                <span className="font-medium">Posted by:</span>{" "}
                {gig.ownerId?.name}
              </p>
            </div>


            {activeGig === gig._id && (
              <div className="mt-4">
                <textarea
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="number"
                  placeholder="Your price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={() => handleSubmitBid(gig._id)}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  Submit Bid
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gigs;
