import React, { useState } from 'react';
import { Clock, Check, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Plan.css';

// Complete 7-day workout data
const DEFAULT_WORKOUTS = {
    Saturday: {
        workouts: [
          {
            id: 'sat-1',
            time: '8:00 AM',
            name: 'Weekend Warrior',
            instructor: 'Mike Johnson',
            type: 'Outdoor Training',
            duration: 60,
            calories: 600,
            difficulty: 'Advanced',
            equipment: ['None'],
            completed: false,
            videoUrl: '',
            description: 'High-intensity outdoor circuit training combining cardio and strength.'
          },
          {
            id: 'sat-2',
            time: '4:00 PM',
            name: 'Recovery Stretch',
            instructor: 'Sarah Lee',
            type: 'Flexibility & Recovery',
            duration: 45,
            calories: 150,
            difficulty: 'Beginner',
            equipment: ['Yoga Mat'],
            completed: false,
            videoUrl: '',
            description: 'Active recovery session to relax muscles and improve mobility.'
          }
        ]
      },
  Monday: {
    workouts: [
      {
        id: 'mon-1',
        time: '6:30 AM',
        name: 'Functional Strength Training',
        instructor: 'Jordan Reed',
        type: 'Strength Training',
        duration: 45,
        calories: 350,
        difficulty: 'Intermediate',
        equipment: ['Dumbbells', 'Resistance Bands'],
        completed: false,
        videoUrl: 'https://example.com/videos/functional-strength',
        description: 'A full-body workout focusing on functional movements that mimic everyday activities.'
      },
      {
        id: 'mon-2',
        time: '12:00 PM',
        name: 'Strength Circuit',
        instructor: 'Jordan Reed',
        type: 'Strength Training',
        duration: 45,
        calories: 350,
        difficulty: 'Advanced',
        equipment: ['Kettlebells', 'Barbells'],
        completed: false,
        videoUrl: '',
        description: 'High-intensity circuit training targeting multiple muscle groups.'
      },
      {
        id: 'mon-3',
        time: '7:00 PM',
        name: 'Yoga Flow',
        instructor: 'Sarah Lee',
        type: 'Mind & Body',
        duration: 60,
        calories: 250,
        difficulty: 'All Levels',
        equipment: ['Yoga Mat'],
        completed: false,
        videoUrl: '',
        description: 'Vinyasa-style yoga session for flexibility and mindfulness.'
      }
    ]
  },
  Tuesday: {
    workouts: [
      {
        id: 'tue-1',
        time: '9:00 AM',
        name: 'Core Stability',
        instructor: 'Alex Morgan',
        type: 'Core Training',
        duration: 30,
        calories: 200,
        difficulty: 'Intermediate',
        equipment: ['Stability Ball', 'Mat'],
        completed: false,
        videoUrl: '',
        description: 'Focused core strengthening and stability workout.'
      },
      {
        id: 'tue-2',
        time: '5:00 PM',
        name: 'Plates Stretch',
        instructor: 'Sarah Lee',
        type: 'Flexibility & Recovery',
        duration: 45,
        calories: 150,
        difficulty: 'Beginner',
        equipment: ['None'],
        completed: false,
        videoUrl: '',
        description: 'A relaxing stretch session focusing on flexibility and mobility.'
      }
    ]
  },
  Wednesday: {
    workouts: [
      {
        id: 'wed-1',
        time: '6:00 AM',
        name: 'HIIT Power Session',
        instructor: 'Chris Williams',
        type: 'Cardio Workouts',
        duration: 45,
        calories: 500,
        difficulty: 'Advanced',
        equipment: ['Jump Rope', 'Kettlebell'],
        completed: false,
        videoUrl: '',
        description: 'High-Intensity Interval Training for maximum fat burn.'
      },
      {
        id: 'wed-2',
        time: '11:30 AM',
        name: 'Full-Body Strength',
        instructor: 'Jordan Reed',
        type: 'Strength Training',
        duration: 45,
        calories: 400,
        difficulty: 'Intermediate',
        equipment: ['Dumbbells', 'Resistance Bands'],
        completed: false,
        videoUrl: '',
        description: 'Comprehensive strength training targeting all major muscle groups.'
      },
      {
        id: 'wed-3',
        time: '7:30 PM',
        name: 'Mindfulness Meditation',
        instructor: 'Emily Thompson',
        type: 'Mind & Body',
        duration: 30,
        calories: 100,
        difficulty: 'All Levels',
        equipment: ['Yoga Mat'],
        completed: false,
        videoUrl: '',
        description: 'A guided meditation session to promote relaxation and mental clarity.'
      }
    ]
  },
  Thursday: {
    workouts: [
      {
        id: 'thu-1',
        time: '6:45 AM',
        name: 'Advanced HIIT',
        instructor: 'Chris Williams',
        type: 'Cardio Workouts',
        duration: 50,
        calories: 550,
        difficulty: 'Advanced',
        equipment: ['Battle Ropes', 'Dumbbells'],
        completed: false,
        videoUrl: '',
        description: 'An intense HIIT session designed for maximum endurance and fat burn.'
      },
      {
        id: 'thu-2',
        time: '7:00 PM',
        name: 'Gentle Yoga',
        instructor: 'Sarah Lee',
        type: 'Mind & Body',
        duration: 60,
        calories: 200,
        difficulty: 'Beginner',
        equipment: ['Yoga Mat'],
        completed: false,
        videoUrl: '',
        description: 'A relaxing yoga session focusing on gentle movements and deep breathing.'
      }
    ]
  },
  Friday: {
    workouts: [
      {
        id: 'fri-1',
        time: '8:30 AM',
        name: 'Functional Core',
        instructor: 'Alex Morgan',
        type: 'Core Training',
        duration: 40,
        calories: 300,
        difficulty: 'Intermediate',
        equipment: ['Medicine Ball', 'Resistance Bands'],
        completed: false,
        videoUrl: '',
        description: 'A core-focused workout improving strength and stability for daily activities.'
      },
      {
        id: 'fri-2',
        time: '1:00 PM',
        name: 'Lower Body Strength',
        instructor: 'Jordan Reed',
        type: 'Strength Training',
        duration: 45,
        calories: 400,
        difficulty: 'Intermediate',
        equipment: ['Barbell', 'Dumbbells'],
        completed: false,
        videoUrl: '',
        description: 'A strength-focused lower body workout targeting glutes, quads, and hamstrings.'
      }
    ]
  },
  
  Sunday: {
    workouts: [
      {
        id: 'sun-1',
        time: '9:00 AM',
        name: 'Restorative Yoga',
        instructor: 'Emily Thompson',
        type: 'Mind & Body',
        duration: 60,
        calories: 180,
        difficulty: 'All Levels',
        equipment: ['Yoga Mat', 'Bolster'],
        completed: false,
        videoUrl: '',
        description: 'Gentle, restorative yoga to start your Sunday with mindfulness.'
      },
      {
        id: 'sun-2',
        time: '5:00 PM',
        name: 'Foam Rolling',
        instructor: 'Alex Morgan',
        type: 'Recovery',
        duration: 30,
        calories: 100,
        difficulty: 'Beginner',
        equipment: ['Foam Roller'],
        completed: false,
        videoUrl: '',
        description: 'Self-myofascial release techniques to prepare for the week ahead.'
      }
    ]
  }
};

const WeeklyPlanner = () => {
  const [workouts, setWorkouts] = useState(DEFAULT_WORKOUTS);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const toggleWorkoutCompletion = (day, workoutId) => {
    const updatedWorkouts = {...workouts};
    const workoutIndex = updatedWorkouts[day].workouts.findIndex(w => w.id === workoutId);
    
    if (workoutIndex !== -1) {
      updatedWorkouts[day].workouts[workoutIndex].completed = 
        !updatedWorkouts[day].workouts[workoutIndex].completed;
      
      setWorkouts(updatedWorkouts);
    }
  };

  const renderWorkoutDetails = (day) => {
    return (
      <AnimatePresence>
        {workouts[day].workouts.map((workout, index) => (
          <motion.div
            key={workout.id}
            className="weekly-planner__workout-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div>
              <div className="weekly-planner__workout-time">
                <Clock className="mr-2" size={20} />
                <span>{workout.time}</span>
              </div>
              <h3 className="weekly-planner__workout-name">{workout.name}</h3>
              <p className="weekly-planner__workout-instructor">
                with {workout.instructor}
              </p>
              <div className="weekly-planner__workout-details">
                <span className="weekly-planner__workout-type">
                  {workout.type}
                </span>
                <span className="weekly-planner__workout-calories">
                  🔥 {workout.calories} Cal
                </span>
                <span className="weekly-planner__workout-duration">
                  ⏱️ {workout.duration} min
                </span>
              </div>
            </div>
            <div className="weekly-planner__workout-actions">
              <button 
                onClick={() => {/* Open workout details modal */}}
                className="weekly-planner__video-button"
                title="View Workout Details"
              >
                <Video size={24} />
              </button>
              <button 
                onClick={() => toggleWorkoutCompletion(day, workout.id)}
                className={`weekly-planner__complete-button ${
                  workout.completed 
                    ? 'weekly-planner__complete-button--completed' 
                    : 'weekly-planner__complete-button--pending'
                }`}
                title={workout.completed ? 'Mark Incomplete' : 'Mark Complete'}
              >
                <Check size={24} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <motion.div 
      className="weekly-planner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="weekly-planner__title">Weekly Workout Plan</h1>
      
      <div className="weekly-planner__days">
        {Object.keys(workouts).map((day) => (
          <motion.button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`weekly-planner__day-button ${
              selectedDay === day 
                ? 'weekly-planner__day-button--active' 
                : 'weekly-planner__day-button--inactive'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {day}
          </motion.button>
        ))}
      </div>

      {selectedDay && (
        <motion.div 
          className="weekly-planner__workout-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="weekly-planner__workout-title">
            {selectedDay} Workouts
          </h2>
          {renderWorkoutDetails(selectedDay)}
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeeklyPlanner;