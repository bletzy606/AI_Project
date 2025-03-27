import React, { forwardRef, useContext, useState } from "react";
import { ScrollContext } from "../context/ScrollContext";
import WorkoutForm from "../components/Workout_Model/WorkoutModal";
import "./CSS/Home.css";
import workoutDemo from "../components/images/05.jpeg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, BarChart2, RefreshCw, Dumbbell, Target } from "lucide-react";
import Plan from "../components/Plan/Plan";
import Plan2 from "../components/Plan/Plan2";
import Dashboard from "./Dashboard";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  const { plansRef, workoutRef, scrollTo } = useContext(ScrollContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const WorkoutPlannerSection = forwardRef((props, ref) => {
    const [sectionRef, sectionInView] = useInView({
      threshold: 0.1,
      triggerOnce: true,
    });

    return (
      <>
        <motion.section
          ref={(el) => {
            if (ref) ref.current = el;
            sectionRef(el);
          }}
          id="plansRef"
          className="section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="workout-planner-section"
            variants={containerVariants}
          >
            <motion.div className="content-left" variants={containerVariants}>
              <motion.h1 variants={itemVariants}>
                Create Your <span className="gradient-text">AI-Powered</span>{" "}
                Workout Plan
              </motion.h1>
              <motion.p className="subtitle" variants={itemVariants}>
                FitGenie AI crafts personalized workout routines tailored to your
                goals, fitness level, and available equipment
              </motion.p>

              <motion.div className="features-list" variants={itemVariants}>
                <motion.div
                  className="feature-item group"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="feature-icon-circle bg-custom-orange">
                    <Zap className="inline-icon text-white" strokeWidth={2.5} />
                  </span>
                  <span>Personalized workout plans based on your metrics</span>
                </motion.div>
                <motion.div
                  className="feature-item group"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="feature-icon-circle bg-custom-purple">
                    <BarChart2
                      className="inline-icon text-white"
                      strokeWidth={2.5}
                    />
                  </span>
                  <span>Real-time progress tracking</span>
                </motion.div>
                <motion.div
                  className="feature-item group"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="feature-icon-circle bg-custom-teal">
                    <RefreshCw
                      className="inline-icon text-white"
                      strokeWidth={2.5}
                    />
                  </span>
                  <span>Dynamic adjustments as you progress</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.button
                  onClick={handleOpenForm}
                  className="generate-plan-btn group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Dumbbell
                    className="mr-2 group-hover:text-[--ORANGEHOVER] transition-colors"
                    strokeWidth={2.5}
                  />
                  Generate My Workout Plan
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="media-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.img
                src={workoutDemo}
                alt="AI Workout Demonstration"
                className="demo-image"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring" }}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Workout Form Modal */}
        <WorkoutForm 
          isOpen={isFormOpen} 
          onClose={handleCloseForm} 
        />
      </>
    );
  });

  return (
    <motion.main
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <WorkoutPlannerSection />
      <Plan2 ref={plansRef} />
      <Plan />
      <motion.section
        ref={workoutRef}
        id="workoutRef"
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <Dashboard ref={workoutRef} />
      </motion.section>
    </motion.main>
  );
};

export default Home;