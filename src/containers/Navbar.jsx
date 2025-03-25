import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { ScrollContext } from "../context/ScrollContext";

const Navbar = () => {
  const { scrollTo, plansRef, workoutRef, compRef } = useContext(ScrollContext);

  const handleNavClick = (e, ref) => {
    e.preventDefault();
    scrollTo(ref);
  };

    return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo-container">
            <div className="logo"></div>
            <span className="logo-text">FitGenie AI</span>
          </div>
        </div>

        <div className="navbar-center">
          <a href="#plansRef" onClick={(e) => handleNavClick(e, plansRef)}>
            Workout Planner
          </a>

          <a href="#workoutRef" onClick={(e) => handleNavClick(e, workoutRef)}>
            Progress Tracker
          </a>

          <a href="#compRef" onClick={(e) => handleNavClick(e, compRef)}>
            Comparaison
          </a>
        </div>

        <div className="navbar-right">
          <Link
            to="/login"
            className="create-mvp-btn"
            style={{ textDecoration: "none" }}
          >
            login here
          </Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
            </>
            
  );
};

export default Navbar;
