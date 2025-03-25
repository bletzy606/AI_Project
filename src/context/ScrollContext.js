// src/contexts/ScrollContext.js
import { createContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const plansRef = useRef(null);
  const workoutRef = useRef(null);
  const compRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (ref, delay = 200) => {
    if (!ref?.current) return; // Prevent errors if ref is undefined

    const isOnHomePage = location.pathname === "/";

    if (!isOnHomePage) {
      // Navigate to home first, then scroll after a slight delay
      navigate("/");
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, delay);
    } else {
      // If already on the home page, scroll immediately
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ScrollContext.Provider value={{ plansRef, workoutRef, compRef, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
};
