import React from 'react';
import { ResponsiveBar } from "@nivo/bar";
import { motion } from 'framer-motion';

const WorkoutTypeBarChart = () => {
  // Workout type distribution data
  const workoutTypeData = [
    { workout: "Cardio", count: 5, color: "var(--RED800)" },
    { workout: "Strength", count: 8, color: "var(--yale-blue)" },
    { workout: "Yoga", count: 3, color: "var(--ORANGENORMAL)" },
    { workout: "HIIT", count: 4, color: "var(--RED100)" },
    { workout: "Swimming", count: 2, color: "var( --raw-umber)" }
  ];

  // Generate a random key to force remount on each page load
  const animationKey = React.useMemo(() => Math.random().toString(36).substring(7), []);

  return (
    <div style={{ 
      height: '97%', 
      width: '100%', 
      position: 'relative' 
    }}>
      <ResponsiveBar
        key={animationKey} // Add unique key to force remount
        data={workoutTypeData}
        keys={["count"]}
        indexBy="workout"
        margin={{ top: 20, right: 10, bottom: 50, left: 50 }}
        padding={0.3}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: 'white',
                fontSize: 10
              }
            },
            legend: {
              text: {
                fill: 'white',
                fontSize: 12
              }
            }
          },
          grid: {
            line: {
              stroke: 'rgba(255,255,255,0.1)'
            }
          }
        }}
        colors={(bar) => bar.data.color}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "Workout Types",
          legendPosition: "middle",
          legendOffset: 40
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Workouts",
          legendPosition: "middle",
          legendOffset: -40
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        barComponent={({ bar }) => (
          <motion.g
            initial={{ 
              scaleY: 0, 
              originY: '100%',
              y: bar.height // Start from bottom of the bar's height
            }}
            animate={{ 
              scaleY: 1,
              y: 0,
              transition: { 
                duration: 0.3, // Reduced duration
                type: "spring",
                delay: (workoutTypeData.length - bar.index - 1) * 0.1 // Adjusted delay for bottom-to-top, left-to-right
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={bar.color}
              opacity={0.8}
            />
          </motion.g>
        )}
      />
    </div>
  );
};

export default WorkoutTypeBarChart;