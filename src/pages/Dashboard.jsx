import React, { forwardRef, useEffect, useState, useContext } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from 'framer-motion';
import { ScrollContext } from "../context/ScrollContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LineChart from "../containers/LineChart";
import WorkoutTypeBarChart from "../containers/WorkoutTypeBarChart";
import StatBox from "../containers/StatBox";

const Dashboard = forwardRef((props, ref) => {
    const { chartRef } = useContext(ScrollContext);
    const theme = useTheme();
    
    // Responsive breakpoints
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    
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

        if (ref?.current) {
            observer.observe(ref?.current);
        }

        return () => {
            if (ref?.current) {
                observer.unobserve(ref?.current);
            }
        };
    }, [ref]);

    // Responsive padding and layout
    const getResponsivePadding = () => {
        if (isSmallScreen) return '1rem';
        if (isMediumScreen) return '2rem';
        return '4rem';
    };

    return (
        <Box
            ref={ref}
            sx={{
                background: '#24252aff',
                minHeight: '100vh',
                width: '90%',
                margin: '0 auto',
                padding: getResponsivePadding(),
                borderRadius: '25px'
            }}
        >
            {/* Dashboard Header */}
            <Box
                display="flex"
                flexDirection={isSmallScreen ? 'column' : 'row'}
                justifyContent="space-between"
                alignItems={isSmallScreen ? 'start' : 'center'}
                mb={3}
            >
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isVisible ? {
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 0.5,
                            type: "spring",
                            stiffness: 120
                        }
                    } : {}}
                >
                    <Typography
                        variant={isSmallScreen ? "h5" : "h4"}
                        fontWeight="bold"
                        sx={{
                            background: 'white',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            m: "0 0 5px 0"
                        }}
                    >
                        DASHBOARD
                    </Typography>
                    <Box
                        sx={{
                            height: '2px',
                            backgroundImage: 'linear-gradient(to right, var(--RED600), var(--ORANGENORMAL))',
                            width: '100px',
                            mt: '2px',
                            mb: '3px'
                        }}
                    />
                    <Typography
                        variant={isSmallScreen ? "h6" : "h5"}
                        color="rgba(255,255,255,0.7)"
                    >
                        Welcome to Your Dashboard
                    </Typography>
                </motion.div>
            </Box>

            {/* STAT BOXES */}
            <Box
                display="flex"
                flexDirection={isSmallScreen ? 'column' : 'row'}
                gap="20px"
                mb="20px"
            >
                {[
                    { 
                        icon: <AccessTimeIcon />, 
                        iconColor: "activeTime", 
                        title: "Active Time", 
                        mainValue: "45 min", 
                        subValue: "Goal: 60 min" 
                    },
                    { 
                        icon: <LocalFireDepartmentIcon />, 
                        iconColor: "caloriesBurned", 
                        title: "Calories Burned", 
                        mainValue: "520 kcal", 
                        subValue: "Remaining: 480 kcal" 
                    },
                    { 
                        icon: <CalendarTodayIcon />, 
                        iconColor: "waterIntake", 
                        title: "Workouts/Week", 
                        mainValue: "4 done", 
                        subValue: "3 remaining" 
                    }
                ].map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isVisible ? {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                delay: 0.2 * (index + 1),
                                type: "spring",
                                stiffness: 120
                            }
                        } : {}}
                        style={{ flex: 1, width: '100%' }}
                    >
                        <StatBox
                            icon={stat.icon}
                            iconColor={stat.iconColor}
                            title={stat.title}
                            mainValue={stat.mainValue}
                            subValue={stat.subValue}
                            color="var(--color)"
                        />
                    </motion.div>
                ))}
            </Box>

            {/* CHARTS ROW */}
            <Box
                display="grid"
                gridTemplateColumns={
                    isSmallScreen 
                        ? "1fr" 
                        : isMediumScreen 
                            ? "repeat(12, 1fr)" 
                            : "repeat(12, 1fr)"
                }
                gridAutoRows={isSmallScreen ? "auto" : "550px"}
                gap="20px"
            >
                {/* Line Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 0.5,
                            delay: 0.8,
                            type: "spring",
                            stiffness: 120
                        }
                    } : {}}
                    whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 15px rgba(0,0,0,0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        gridColumn: isSmallScreen 
                            ? 'span 1' 
                            : isMediumScreen 
                                ? 'span 12' 
                                : 'span 8',
                        backgroundColor: 'var(--color)',
                        borderRadius: '8px',
                        padding: '43px'
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        mb="15px"
                        color="white"
                    >
                        Workout Progress
                    </Typography>
                    <Box
                        sx={{
                            height: '2px',
                            backgroundImage: 'linear-gradient(to right, var(--RED600), var(--ORANGENORMAL))',
                            width: '100px',
                            mt: '2px',
                            mb: '3px'
                        }}
                    />
                    <LineChart ref={chartRef} />
                </motion.div>

                {/* Workout Type Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 0.5,
                            delay: 1,
                            type: "spring",
                            stiffness: 120
                        }
                    } : {}}
                    whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 15px rgba(0,0,0,0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        gridColumn: isSmallScreen 
                            ? 'span 1' 
                            : isMediumScreen 
                                ? 'span 12' 
                                : 'span 4',
                        backgroundColor: 'var(--color)',
                        borderRadius: '8px',
                        padding: '43px'
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        mb="15px"
                        color="white"
                    >
                        Workout Distribution
                    </Typography>
                    <Box
                        sx={{
                            height: '2px',
                            backgroundImage: 'linear-gradient(to right, var(--RED600), var(--ORANGENORMAL))',
                            width: '100px',
                            mt: '2px',
                            mb: '3px'
                        }}
                    />
                    <WorkoutTypeBarChart />
                </motion.div>
            </Box>
        </Box>
    );
});

export default Dashboard;