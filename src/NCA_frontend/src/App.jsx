import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthProvider';
import Home from './component/Home';
import Contribute from './component/Contribute';
import PurchaseCC from './component/PurchaseCC';
import Login from './component/Login';
import Register from './component/Register';
import Footer from './component/Footer';
import Header from './component/Header';
import HomeCard from './component/HomeCard';
import LatestNews from './component/LatestNews';
import LogRegInput from './component/LogRegInput';
import Supported from './component/Supported';
import Logout from './component/Logout';
import '../index.css';
import {Navigate} from 'react-router-dom';
import {useAuth} from './AuthProvider';

// Define routes for the app
const routes = [
  {
    path: "/NCA",
    element: <Home />,
  },
  {
    path: "/NCA/contribute",
    element: <Contribute />,
  },
  {
    path: "/NCA/purchaseCC",
    element: <PurchaseCC />,
  },
  {
    path: "/NCA/login",
    element: <Login />,
  },
  {
    path: "/NCA/register",
    element: <Register />,
  },
  {
    path: "/NCA/logout",
    element: <Logout />,
  },
  // {
  //   path: "*", 
  //   element: <NotFoundPage />,
  // }
];

function App() {
  const {isAuth} = useAuth();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <main id="mainapp">
            {/* Place your Navbar here */}
            {/* <Header /> */}
            <Routes>
              <Route path="/" element = {<Navigate to="/NCA" />} />
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
            {/* <Footer /> */}
          </main>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

// export default () => {
//   <AuthProvider>
//     <App/>
//   </AuthProvider>
// }
