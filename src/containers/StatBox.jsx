import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const StatBox = ({ 
  icon, 
  title, 
  mainValue, 
  subValue, 
  color = 'var(--RED800)',
  iconColor 
}) => {
  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  // Mapping for specific icon colors
  const iconColors = {
    'activeTime': '#b9461570',
    'caloriesBurned': '#943f19ff',
    'waterIntake': '#77060b'
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: '100%' }}
    >
      <Box 
        sx={{
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: 'var(--color)',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease'
        }}
      >
        <motion.div 
          variants={itemVariants}
          style={{ 
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {React.cloneElement(icon, { 
            sx: { 
              fontSize: 40,
              color: iconColors[iconColor] || 'inherit'
            } 
          })}
        </motion.div>
        
        <motion.div variants={itemVariants} style={{ width: '100%' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              marginBottom: '8px',
              color: 'white'
            }}
          >
            {title}
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants} style={{ width: '100%' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              marginBottom: '4px',
              color: 'white'
            }}
          >
            {mainValue}
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants} style={{ width: '100%' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)' 
            }}
          >
            {subValue}
          </Typography>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default StatBox;