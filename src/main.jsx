import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from "./components/custom/Header.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]'
import MyTrips from './my-trips/index.jsx';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>
  },
  {
    path: '/create-trip',
    element: <CreateTrip/>
  },
  {
      path: '/view-trip/:tripId', 
      element: <Viewtrip/>
  },
  {
      path: '/my-trips', 
      element: <MyTrips/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the app with GoogleOAuthProvider and pass the OAuth client ID */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header/>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
