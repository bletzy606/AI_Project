
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useRef } from 'react'; // Added useRef import
import Home from './pages/Home';
import Navbar from './containers/Navbar';
import Footer from './components/Footer/Footer';
import { ScrollProvider } from './context/ScrollContext';
import Login from './pages/login';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard'; 

function App() {
  const workoutRef = useRef(null); // Added workoutRef definition

  return (
    <BrowserRouter>
      <ScrollProvider>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard ref={workoutRef} />} />
          </Route>
        </Routes>
        <Footer />
      </ScrollProvider>
    </BrowserRouter>
  )
}

export default App;