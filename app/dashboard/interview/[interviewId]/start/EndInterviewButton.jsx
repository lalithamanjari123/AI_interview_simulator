import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EndInterviewButton = ({ onClick ,interviewData,emotionData}) => {
    const router = useRouter();
    const handleAnalyze = () => {
        if (onClick) {
          onClick(); // End the interview
        }
      
        // Ensure interviewData and emotionData are valid
        if (!interviewData?.mockId || !emotionData) {
          console.error("Missing interview data or emotion data");
          return;
        }
      
        const feedbackPath = `/dashboard/interview/${interviewData.mockId}/feedback`;
        const queryParams = `?data=${encodeURIComponent(JSON.stringify(emotionData))}`;
      
        // Combine path and query
        const fullPath = feedbackPath + queryParams;
      
        console.log("Navigating to:", fullPath); // Log the full path
      
        // Navigate using the full path
        router.push(fullPath);
      };
      
  return (
    
    <Button
      onClick={handleAnalyze}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      End Interview
    </Button>
    
  );
};

export default EndInterviewButton;
