import React from "react";
import "./Footer.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="footer"
    >
      <div className="footer-container">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="footer-header">
          <h2 className="footer-title">
            FitGenie AI helps you transform your fitness fast
          </h2>
        </motion.div>

        {/* Links Grid */}
        <motion.div variants={itemVariants} className="links-grid">
          <motion.div variants={itemVariants} className="links-column">
            <h3 className="column-title">Platform</h3>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/features">Workout Planner</a>
              </li>
              <li>
                <a href="/pricing">Progress Tracker</a>
              </li>
              <li>
                <a href="/contact">Comparaison</a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="links-column">
            <h3 className="column-title">Resources</h3>
            <ul>
              <li>
                <a href="/account">Account</a>
              </li>
              <li>
                <a href="/tools">Tools</a>
              </li>
              <li>
                <a href="/newsletter">Newsletter</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="links-column">
            <h3 className="column-title">Legals</h3>
            <ul>
              <li>
                <a href="/guides">Guides</a>
              </li>
              <li>
                <a href="/terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/licensing">Licensing</a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="social-section">
          <span>Follow us on:</span>
          <div className="social-icons">
            <a href="#">
              <FiGithub />
            </a>
            <a href="#">
              <FiTwitter />
            </a>
            <a href="#">
              <FiLinkedin />
            </a>
            <a href="#">
              <FiInstagram />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
