"use Client"
import React from 'react';

const EmotionAnalysis = ({ emotionData }) => {
  const emotionCounts = emotionData.reduce((counts, emotion) => {
    counts[emotion] = (counts[emotion] || 0) + 1;
    return counts;
}, {}); // Initialize as an empty object

const dominantEmotion = 
    Object.keys(emotionCounts).length > 0 // Check if `emotionCounts` has any keys
        ? Object.keys(emotionCounts).reduce((a, b) =>
            emotionCounts[a] > emotionCounts[b] ? a : b
          )
        : null; // Fallback if no emotions are present

  return (
    <div className="w-full lg:w-1/3">
      <h2 className="text-xl font-semibold mb-4">Analysis</h2>
      <p className="text-lg">
        The most dominant emotion during the session was "{dominantEmotion}".
      </p>
    </div>
  );
};

export default EmotionAnalysis;
