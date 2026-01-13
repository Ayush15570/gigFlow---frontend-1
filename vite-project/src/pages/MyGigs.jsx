import { useEffect, useState } from "react";
import api from "../api/axios";
import React from "react";
const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [bids, setBids] = useState([]);

  const fetchMyGigs = async () => {
    try {
      const res = await api.get("/gigs/my"); 
      setGigs(res.data);
    } catch (err) {
      alert("Failed to load your gigs");
    }
  };

  const fetchBids = async (gigId) => {
    try {
      const res = await api.get(`/bids/${gigId}`);
      setBids(res.data);
      setSelectedGig(gigId);
    } catch (err) {
      alert("Failed to load bids");
    }
  };

 
  const handleHire = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      alert("Freelancer hired successfully");
      setBids([]);
      setSelectedGig(null);
      fetchMyGigs(); 
    } catch (err) {
      alert("Hiring failed");
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">My Gigs</h2>

      {gigs.length === 0 && <p>You haven’t created any gigs yet.</p>}

      {gigs.map((gig) => (
        <div key={gig._id} className="border p-4 mb-4 rounded">
          <h3
            className="text-lg font-semibold cursor-pointer text-blue-600"
            onClick={() => fetchBids(gig._id)}
          >
            {gig.title}
          </h3>

          <p>Status: {gig.status}</p>

          
          {selectedGig === gig._id && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Bids</h4>

              {bids.length === 0 && <p>No bids yet.</p>}

              {bids.map((bid) => (
                <div
                  key={bid._id}
                  className="border p-3 mb-2 rounded flex justify-between items-center"
                >
                  <div>
                    
                    <p><strong>Message:</strong> {bid.message}</p>
                    <p><strong>Price:</strong> ₹{bid.price}</p>
                    <p><strong>Status:</strong> {bid.status}</p>
                  </div>

                  {gig.status === "open" && bid.status === "pending" && (
                    <button
                      onClick={() => handleHire(bid._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Hire
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyGigs;
