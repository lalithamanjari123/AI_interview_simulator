"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  BarElement, // Bar element for bar charts
  CategoryScale, // Category scale for the x-axis
  LinearScale, // Linear scale for the y-axis
  BarController, // Bar controller
  Tooltip, // Tooltip for hover effects
  Legend // Legend for the chart
} from 'chart.js';

// Register the components
Chart.register(BarElement, CategoryScale, LinearScale, BarController, Tooltip, Legend);



const EmotionGraph = ({ emotionData }) => {
  const emotionCounts = emotionData.reduce((acc, emotion) => {
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {});

  const graphData = {
    labels: Object.keys(emotionCounts),
    datasets: [
      {
        label: 'Emotion Frequency',
        data: Object.values(emotionCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-96">
      <h2 className="text-xl font-semibold mb-4">Emotion Graph</h2>
      <Bar
        data={graphData}
        options={{
          responsive: true,
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } },
          },
        }}
      />
    </div>
  );
};

export default EmotionGraph;
