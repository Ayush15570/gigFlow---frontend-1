import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header'
import React from 'react'
import { useEffect } from 'react'
import { socket } from './api/socket'
import { useSelector } from 'react-redux'
function App() {
   const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
      console.log("🟢 Joined socket room:", user._id);
    }
  }, [user]);
  useEffect(() => {
  console.log("AUTH USER:", user);
}, [user]);

   useEffect(() => {
  socket.on("hired", (data) => {
    alert(data.message);
  });

  return () => socket.off("hired");
}, []);

  return (
    <>
     <Header/>
     <main className='min-h-screen'>
      <Outlet/>
     </main>
      
    </>
  )
}

export default App
