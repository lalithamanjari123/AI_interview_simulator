"use client";
import React from "react";

const ResumeScoreSuggestions = ({ score, suggestions }) => {
  return (
    <div>
      {score && (
        <div className="results mt-6">
          <h3 className="text-xl font-bold">Your Resume Score: {score}/10</h3>
          <h4 className="mt-2 font-semibold">Suggestions for Improvement:</h4>
          <ul className="list-disc pl-5">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="mt-1">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeScoreSuggestions;
