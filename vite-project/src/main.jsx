import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux' 
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './pages/signup.jsx'
import Login from './pages/Login.jsx'
import React from 'react'
import Gigs from './pages/Gigs.jsx'
import CreateGig from './pages/CreateGig.jsx'
import Home from './pages/Home.jsx'
import MyGigs from './pages/MyGigs.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        index:true,
        element: <Home/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/login",
        element:<Login/>
      },
      {
        path:"/gigs",
        element:<Gigs/>
      },
      {
        path:"/create-gig",
        element:<CreateGig/>
      },
      {
        path: "/my-gigs",
        element: <MyGigs/>
      }
      
    ]
    
  },
 
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}  />
    </Provider>
    
  </StrictMode>,
)
