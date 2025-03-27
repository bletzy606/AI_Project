import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WorkoutCompletedModal.css';

const WorkoutCompletedModal = ({ 
  isOpen, 
  onClose, 
  workoutName 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="workout-completed-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="workout-completed-modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Confetti Background */}
            <div className="confetti-container">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="confetti"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ 
                    y: [0, 100],
                    opacity: [1, 0],
                    x: Math.random() * 100 - 50,
                    rotate: Math.random() * 360
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  style={{
                    background: `hsl(${Math.random() * 60 + 15}, 100%, 50%)`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`
                  }}
                />
              ))}
            </div>

            {/* Trophy Icon with Gradient */}
            <motion.div 
              className="workout-completed-trophy"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="url(#trophy-gradient)"
                stroke="var(--RED800)" 
                strokeWidth="1.5"
              >
                <defs>
                  <linearGradient id="trophy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--Orange)" />
                    <stop offset="100%" stopColor="var(--RED500)" />
                  </linearGradient>
                </defs>
                <path d="M12 15a7 7 0 0 0 7-7H5a7 7 0 0 0 7 7z"/>
                <path d="M5 8a7 7 0 0 1 14 0"/>
                <path d="M8.5 8.5v3a3.5 3.5 0 0 0 7 0v-3"/>
                <path d="M12 19v2"/>
                <path d="M8 22h8"/>
              </svg>
            </motion.div>

            {/* Title with Glow Effect */}
            <motion.h2 
              className="workout-completed-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="title-glow">WORKOUT MASTERED</span>
            </motion.h2>

            {/* Subtitle with Animated Dots */}
            <motion.p 
              className="workout-completed-subtitle"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              You crushed it! <span className="animated-dots">...</span>
            </motion.p>

            {/* Workout Details with Progress Ring */}
            <motion.div 
              className="workout-completed-details"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="progress-ring">
                <svg width="60" height="60">
                  <circle
                    className="progress-ring-circle"
                    stroke="var(--raisin-black-2)"
                    strokeWidth="4"
                    fill="transparent"
                    r="24"
                    cx="30"
                    cy="30"
                  />
                  <circle
                    className="progress-ring-circle"
                    stroke="url(#progress-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="151"
                    strokeDashoffset="30"
                    fill="transparent"
                    r="24"
                    cx="30"
                    cy="30"
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--Orange)" />
                      <stop offset="100%" stopColor="var(--RED500)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-text">100%</div>
              </div>
              <div className="workout-info">
                <p className="completed-label">Completed:</p>
                <h3>{workoutName || 'Your Workout'}</h3>
                <p className="motivation-text">You're stronger than yesterday!</p>
              </div>
            </motion.div>

            {/* Close Button with Icon */}
            <motion.button 
              className="workout-completed-button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              CELEBRATE
            </motion.button>

            {/* Social Sharing */}
            <motion.div 
              className="social-sharing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p>Share your achievement:</p>
              <div className="social-icons">
                <button className="social-icon instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </button>
                <button className="social-icon twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WorkoutCompletedModal;