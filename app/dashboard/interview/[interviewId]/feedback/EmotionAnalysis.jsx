"use client"
import React from 'react';

const EmotionAnalysis = ({ emotionData }) => {
  const emotionCounts = emotionData.reduce((counts, emotion) => {
    counts[emotion] = (counts[emotion] || 0) + 1;
    return counts;
  }, {}); // Initialize as an empty object

  const totalEmotions = emotionData.length; // Total number of emotions detected

  // Calculate percentage for each emotion
  const emotionPercentages = Object.keys(emotionCounts).reduce((percentages, emotion) => {
    const count = emotionCounts[emotion];
    percentages[emotion] = ((count / totalEmotions) * 100).toFixed(2); // Round to 2 decimal places
    return percentages;
  }, {});

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
        {dominantEmotion 
          ? `The most dominant emotion during the session was "${dominantEmotion}".`
          : "Your face is not detected properly."}
      </p>
      
      {/* List of Emotion Percentages */}
      {totalEmotions > 0 && (
        <div>
          <h3 className="mt-4 text-lg font-semibold">Emotion Percentages</h3>
          <ul className="list-disc pl-5">
            {Object.keys(emotionPercentages).map((emotion) => (
              <li key={emotion}>{`${emotion}: ${emotionPercentages[emotion]}%`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmotionAnalysis;
