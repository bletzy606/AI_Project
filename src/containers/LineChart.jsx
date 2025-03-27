import React from 'react';
import { ResponsiveLine } from "@nivo/line";
import { motion } from 'framer-motion';

const LineChart = () => {
  // Workout progress data
  const workoutData = [
    {
      id: "Calories Burned",
      color: "var(--RED800)",
      data: [
        { x: "Monday", y: 350 },
        { x: "Tuesday", y: 420 },
        { x: "Wednesday", y: 380 },
        { x: "Thursday", y: 450 },
        { x: "Friday", y: 400 },
        { x: "Saturday", y: 300 },
        { x: "Sunday", y: 250 }
      ]
    },
    {
      id: "Workout Duration (Minutes)",
      color: "var(--ORANGENORMAL)",
      data: [
        { x: "Monday", y: 45 },
        { x: "Tuesday", y: 60 },
        { x: "Wednesday", y: 50 },
        { x: "Thursday", y: 55 },
        { x: "Friday", y: 65 },
        { x: "Saturday", y: 40 },
        { x: "Sunday", y: 35 }
      ]
    },
    {
      id: "Total Weight Lifted (kg)",
      color: "var(--yale-blue)",
      data: [
        { x: "Monday", y: 1200 },
        { x: "Tuesday", y: 1350 },
        { x: "Wednesday", y: 1250 },
        { x: "Thursday", y: 1400 },
        { x: "Friday", y: 1300 },
        { x: "Saturday", y: 1100 },
        { x: "Sunday", y: 950 }
      ]
    },
    {
      id: "Exercises Completed",
      color: "var(--RED100)",
      data: [
        { x: "Monday", y: 8 },
        { x: "Tuesday", y: 10 },
        { x: "Wednesday", y: 9 },
        { x: "Thursday", y: 11 },
        { x: "Friday", y: 10 },
        { x: "Saturday", y: 6 },
        { x: "Sunday", y: 5 }
      ]
    }
  ];

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px', boxSizing: 'border-box' }}>
      <ResponsiveLine
        data={workoutData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        colors={(d) => d.color}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: 'white'
              }
            },
            legend: {
              text: {
                fill: 'white'
              }
            }
          },
          grid: {
            line: {
              stroke: 'rgba(255,255,255,0.1)'
            }
          },
          tooltip: {
            container: {
              background: 'transparent',
              color: 'white',
              boxShadow: 'none',
              border: 'none'
            }
          }
        }}
        curve="linear"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Days of the Week",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Workout Metrics",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={true}
        animate={true}
        motionStiffness={120}
        motionDamping={15}
        tooltip={({ point }) => (
          <div 
            style={{ 
              color: 'white', 
              background: 'transparent', 
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <div 
              style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: point.serieColor, 
                marginRight: '8px' 
              }} 
            />
            <div>
              {point.serieId}: {point.data.yFormatted}
            </div>
          </div>
        )}
        lineComponent={({ line, lineGenerator }) => (
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              transition: { 
                duration: 1.5,
                type: "spring",
                stiffness: 100,
                delay: line.index * 0.2 
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            d={lineGenerator(line.linePoints)}
            fill="none"
            stroke={line.color}
            strokeWidth={3}
          />
        )}
        pointComponent={({ point }) => (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                type: "spring",
                stiffness: 300,
                delay: point.index * 0.1 
              }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r={6}
              fill={point.color}
              stroke={point.color}
              strokeWidth={2}
            />
          </motion.g>
        )}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(255,255,255,0.5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(255,255,255,0.03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineChart;