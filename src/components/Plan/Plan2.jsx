import React, { useState, forwardRef, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Plan2.css";
import WorkoutCompletedModal from '../CompletedWorkout/WorkoutCompletedModal'
import photo from '../images/01.jpeg'

const Plan2= forwardRef((props, ref) => {
  // Get current date information
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const [completedWorkouts, setCompletedWorkouts] = useState({});
    const [showWorkoutCompletedModal, setShowWorkoutCompletedModal] = useState(false);
    const [selectedCompletedWorkout, setSelectedCompletedWorkout] = useState(null);
  
  // Intersection Observer setup
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [checkedActivities, setCheckedActivities] = useState({});

  const toggleActivity = (day, time, activity) => {
    const key = `${day}-${time}-${activity}`;
    
    const updatedCheckedActivities = {
        ...checkedActivities,
        [key]: !checkedActivities[key],
      };
      setCheckedActivities(updatedCheckedActivities);
  
      // Handle workout completion
      if (updatedCheckedActivities[key]) {
        // Workout is being marked as completed
        setCompletedWorkouts(prev => ({
          ...prev,
          [key]: true
        }));
        
        // Show completion modal
        setSelectedCompletedWorkout(activity);
        setShowWorkoutCompletedModal(true);
      } else {
        // Workout is being unchecked
        const updatedCompletedWorkouts = {...completedWorkouts};
        delete updatedCompletedWorkouts[key];
        setCompletedWorkouts(updatedCompletedWorkouts);
      }
    };
  
    // Close workout completed modal
    const closeWorkoutCompletedModal = () => {
      setShowWorkoutCompletedModal(false);
      setSelectedCompletedWorkout(null);
    };
  


 
  const getCurrentWeekDates = () => {
    const dayOfWeek = currentDate.getDay(); 
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - dayOfWeek);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      weekDates.push({
        name: date.toLocaleString('default', { weekday: 'long' }),
        date: date.getDate()
      });
    }
    return weekDates;
  };

  const days = getCurrentWeekDates();
  const timeSlots = [
    "6:00 AM",
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
    "8:00 PM",
  ];

  const scheduleData = {
    Sunday: {
      "8:00 AM": ["Restorative Yoga 8:00 AM · Emily Thompson"],
      "4:00 PM": ["Foam Rolling 4:00 PM · Alex Morgan"],
    },
    Monday: {
      "8:00 AM": ["Functional Strength Training 6:30 AM · Jordan Reed"],
      "12:00 PM": ["Strength Circuit 12:00 PM · Jordan Reed"],
      "8:00 PM": ["Yoga Flow 7:00 PM · Sarah Lee"],
    },
    Tuesday: {
      "10:00 AM": ["Core Stability 9:00 AM · Alex Morgan"],
      "6:00 PM": ["Plates Stretch 5:00 PM · Sarah Lee"],
    },
    Wednesday: {
      "8:00 AM": ["HIIT Power Session 6:00 AM · Chris Williams"],
      "12:00 PM": ["Full-Body Strength 11:30 AM · Jordan Reed"],
      "8:00 PM": ["Mindfulness Meditation 7:30 PM · Emily Thompson"],
    },
    Thursday: {
      "8:00 AM": ["Advanced HIIT 6:45 AM · Chris Williams"],
      "8:00 PM": ["Gentle Yoga 7:00 PM · Sarah Lee"],
    },
    Friday: {
      "10:00 AM": ["Functional Core 8:30 AM · Alex Morgan"],
      "12:00 PM": ["Lower Body Strength 1:00 PM · Jordan Reed"],
    },
    Saturday: {
      "9:00 AM": ["Weekend Warrior 9:00 AM · Mike Johnson"],
      "5:00 PM": ["Recovery Stretch 5:00 PM · Sarah Lee"],
    },
  };

  // Complete workout details with exercises
  const workoutDetails = {
    "Functional Strength Training 6:30 AM · Jordan Reed": {
      description: "A full-body workout focusing on functional movements that mimic everyday activities.",
      calories: 350,
      duration: "45 min",
      video: "https://www.youtube.com/watch?v=vVsFpWT26d4",
      image: "https://example.com/images/functional-strength.jpg",
      exercises: [
        {
          name: "Squat to Press",
          sets: "3 sets of 12 reps",
          description: "Stand with feet shoulder-width apart, squat down then press weights overhead as you stand.",
          image: "https://example.com/images/squat-press.jpg",
          video: "https://example.com/videos/squat-press",
        },
        {
          name: "Lunge with Rotation",
          sets: "3 sets per side",
          description: "Step forward into a lunge while rotating your torso toward the front leg.",
          image: "https://example.com/images/lunge-rotation.jpg",
          video: "https://example.com/videos/lunge-rotation",
        },
      ],
    },
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const handleWorkoutClick = (e, day) => {
    e.stopPropagation();
    setSelectedDay(day);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDay(null);
  };

  return (
    <motion.section 
      ref={ref}  // Using the forwarded ref here
      id="plansRef" 
      className="section"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="planner-container">
        {/* Your Personal Workout Planner Title */}
        <div className="title-container">
          <motion.h1 
            className="personal-title"
            initial={{ y: -20, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="gradient-text">Your Personal Workout Planner</span>
          </motion.h1>
        </div>

        <motion.h1 
          className="month-header2"
          initial={{ y: -20, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {currentMonth} {currentYear}
        </motion.h1>

        <motion.div 
          className="categories-section"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="categories-title">All Categories</h3>
          <div className="categories-grid">
            {[
              { name: "Cardio Workouts", gradient: "linear-gradient(145deg, var(--RED800), var(--ORANGENORMAL))" },
              { name: "Strength Training", gradient: "linear-gradient(145deg, var(--raisin-black-2), var(--yale-blue))" },
              { name: "Flexibility & Mobility", gradient: "linear-gradient(145deg, var(--raisin-black-2), var(--raw-umber))" },
              { name: "Core Training", gradient: "linear-gradient(145deg, var(--raisin-black-2), var(--RED600))" },
              { name: "Mind & Body", gradient: "linear-gradient(145deg, var(--raisin-black-2), var(--RED800))" },
              { name: "Recovery & Relaxation", gradient: "linear-gradient(145deg, var(--raisin-black-2), var(--ORANGENORMAL))" },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                className="category-card"
                style={{ background: category.gradient }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {category.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="schedule-container">
          <div className="time-zone">UTC +1</div>

          <div className="days-header">
            {days.map((day) => (
              <motion.div
                key={day.name}
                className={`day-header ${selectedDay === day.name ? "active" : ""}`}
                onClick={() => handleDayClick(day.name)}
                initial={{ y: 20, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="day-name">{day.name}</div>
                <div className="day-date">{day.date}</div>
              </motion.div>
            ))}
          </div>

          <div className="schedule-grid">
            {timeSlots.map((time, timeIndex) => (
              <React.Fragment key={time}>
                <motion.div 
                  className="time-slot"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: timeIndex * 0.05 }}
                >
                  <div className="time-text">{time}</div>
                </motion.div>
                {days.map((day, dayIndex) => (
                  <motion.div
                    key={`${day.name}-${time}`}
                    className={`schedule-cell ${
                      scheduleData[day.name]?.[time] ? "has-activity" : ""
                    }`}
                    onClick={(e) =>
                      scheduleData[day.name]?.[time] &&
                      handleWorkoutClick(e, day.name)
                    }
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      delay: 0.1 + (timeIndex * days.length + dayIndex) * 0.01,
                      type: "spring", 
                      stiffness: 300 
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {scheduleData[day.name]?.[time]?.map((activity) => (
                      <motion.div 
                        key={activity} 
                        className="activity"
                        initial={{ scale: 0.9 }}
                        animate={isVisible ? { scale: 1 } : {}}
                        transition={{ type: "spring" }}
                      >
                        <div className="activity-content">
                          {activity.includes("@9") ? (
                            <span className="special-activity">
                              {activity.replace("@9", "")}
                            </span>
                          ) : (
                            activity
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showModal && selectedDay && (
            <motion.div 
              className="modal-overlay" 
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <motion.button 
                  className="close-modal" 
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  &times;
                </motion.button>
                <h2 className="modal-title">{selectedDay}'s Workouts</h2>

                <div className="workouts-list">
                  {Object.entries(scheduleData[selectedDay]).map(
                    ([time, activities], index) => (
                      <motion.div 
                        key={time} 
                        className="time-group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="time-header">
                          <h3>{time}</h3>
                          <div className="time-line"></div>
                        </div>
                        {activities.map((activity) => {
                          const details = workoutDetails[activity] || {
                            description: "Workout details coming soon",
                            calories: 300,
                            duration: "45 min",
                            exercises: []
                          };
                          return (
                            <motion.div 
                              key={activity} 
                              className="workout-card"
                              whileHover={{ scale: 1.01 }}
                            >
                              <div className="workout-header">
                                <h4>{activity}</h4>
                                <div className="workout-meta">
                                  <span className="calories-badge">
                                    {details?.calories} kcal
                                  </span>
                                  <span className="duration-badge">
                                    {details?.duration}
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={
                                      checkedActivities[
                                        `${selectedDay}-${time}-${activity}`
                                      ] || false
                                    }
                                    onChange={() =>
                                      toggleActivity(selectedDay, time, activity)
                                    }
                                    className="activity-checkbox"
                                  />
                                </div>
                              </div>

                              <div className="workout-details">
                                <p className="workout-description">
                                  {details.description}
                                </p>

                                <div className="workout-media">
                                  {details.image && (
                                    <div className="media-item">
                                      <img src={details.image} alt={activity} className="workout-image" />
                                    </div>
                                  )}
                                  {details.video && (
                                    <div className="media-item">
                                      <video controls className="workout-video">
                                        <source src={details.video} type="video/mp4" />
                                      </video>
                                    </div>
                                  )}
                                </div>
                                
                                {details.exercises.length > 0 && (
                                  <div className="exercises-section">
                                    <h5>Exercises</h5>
                                    <div className="exercises-grid">
                                      {details.exercises.map((exercise, idx) => (
                                        <motion.div 
                                          key={idx} 
                                          className="exercise-card"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: idx * 0.1 }}
                                        >
                                          <div className="exercise-header">
                                            <h6>{exercise.name}</h6>
                                            <span className="exercise-sets">
                                              {exercise.sets}
                                            </span>
                                          </div>
                                          <p className="exercise-description">
                                            {exercise.description}
                                          </p>
                                          <div className="exercise-media">
                                            {exercise.image && (
                                              <img src={exercise.image} alt={exercise.name} className="exercise-image" />
                                            )}
                                            {exercise.video && (
                                              <video controls className="exercise-video">
                                                <source src={exercise.video} type="video/mp4" />
                                              </video>
                                            )}
                                          </div>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
          <WorkoutCompletedModal 
        isOpen={showWorkoutCompletedModal}
        onClose={closeWorkoutCompletedModal}
        workoutName={selectedCompletedWorkout}
      />
    </motion.section>
  );
});

export default Plan2;