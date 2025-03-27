import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Search, Workflow } from "lucide-react";
import "./WorkoutModal.css";

// Import a fitness-related image with transparent background
import fitnessImage from "../images/02.jpeg";

const WorkoutForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fitnessLevel: "",
    fitnessGoal: "",
    equipmentAvailable: "",
    workoutTime: "",
  });

  // Static options for dropdown selections
  const fitnessLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Professional",
  ];

  const fitnessGoals = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Flexibility",
    "General Fitness",
  ];

  const equipmentOptions = [
    "Bodyweight Only",
    "Dumbbells",
    "Resistance Bands",
    "Full Gym Access",
    "Minimal Home Equipment",
  ];

  const workoutTimeOptions = [
    "15-30 Minutes",
    "30-45 Minutes",
    "45-60 Minutes",
    "60+ Minutes",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchAlgoGenerate = () => {
    // Implement search algorithm-based workout generation
    console.log("Generating workout with Search Algorithm", formData);
  };

  const handleConstraintSatisfactionGenerate = () => {
    // Implement constraint satisfaction-based workout generation
    console.log("Generating workout with Constraint Satisfaction", formData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="workout-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="workout-modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Form Content */}
        <div className="form-section">
          <div>
            <h2 className="modal-title">Personalize Your Workout</h2>

            {/* Fitness Level */}
            <div className="form-group">
              <label>Fitness Level</label>
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Fitness Level</option>
                {fitnessLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Fitness Goal */}
            <div className="form-group">
              <label>Fitness Goal</label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Fitness Goal</option>
                {fitnessGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>

            {/* Equipment */}
            <div className="form-group">
              <label>Available Equipment</label>
              <select
                name="equipmentAvailable"
                value={formData.equipmentAvailable}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Equipment</option>
                {equipmentOptions.map((equipment) => (
                  <option key={equipment} value={equipment}>
                    {equipment}
                  </option>
                ))}
              </select>
            </div>

            {/* Workout Time */}
            <div className="form-group">
              <label>Workout Duration</label>
              <select
                name="workoutTime"
                value={formData.workoutTime}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Workout Duration</option>
                {workoutTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Generation Buttons */}
            <div className="button-group">
              <button
                onClick={handleSearchAlgoGenerate}
                className="generate-btn search-algo"
              >
                <Search className="mr-2" /> Generate (Search Algorithm)
              </button>
              <button
                onClick={handleConstraintSatisfactionGenerate}
                className="generate-btn constraint-algo"
              >
                <Workflow className="mr-2" /> Generate (Constraint Satisfaction)
              </button>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="image-section">
          <div className="absolute inset-0 opacity-70"></div>
          <img
            src={fitnessImage}
            alt="Fitness Illustration"
            className="modal-image"
          />
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="close-btn">
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};

export default WorkoutForm;
