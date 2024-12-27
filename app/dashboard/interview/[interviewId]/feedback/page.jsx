"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import EmotionGraph from './EmotionGraph'
import EmotionAnalysis from './EmotionAnalysis'
import { useParams as getRouteParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedTab, setSelectedTab] = useState('feedback');  // State to track the selected tab
  const router = useRouter();
  const routeParams = getRouteParams();
  const interviewId = routeParams.interviewId;
  const searchParams = useSearchParams();
  const emotionData = JSON.parse(searchParams.get('data') || '[]'); // Parse query parameter

  useEffect(() => {
    GetFeedback();
  }, [interviewId]);  // Add params dependency to ensure it updates when interviewId changes

  const GetFeedback = async () => {
    try {
      const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      console.log(result);

      if (result.length > 0) {
        setFeedbackList(result);
      } else {
        console.log("No answers recorded.");
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className='p-10'>
      {/* Tabs Navigation */}
      <div className="mb-4">
  <ul className="flex space-x-4 text-sm font-medium text-center border-b border-gray-200 dark:border-gray-700">
    <li className="flex-1" role="presentation">
      <button
        onClick={() => setSelectedTab('feedback')}
        className={`inline-block p-4 border-b-2 rounded-t-lg w-full ${selectedTab === 'feedback' ? 'border-t-4 border-l-4 border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-600'}`}
        role="tab"
      >
        Feedback
      </button>
    </li>
    <li className="flex-1" role="presentation">
      <button
        onClick={() => setSelectedTab('video')}
        className={`inline-block p-4 border-b-2 rounded-t-lg w-full ${selectedTab === 'video' ? 'border-t-4 border-l-4 border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-600'}`}
        role="tab"
      >
        Video Analysis
      </button>
    </li>
    <li className="flex-1" role="presentation">
      <button
        onClick={() => setSelectedTab('audio')}
        className={`inline-block p-4 border-b-2 rounded-t-lg w-full ${selectedTab === 'audio' ? 'border-t-4 border-l-4 border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-600'}`}
        role="tab"
      >
        Audio Analysis
      </button>
    </li>
  </ul>
</div>



      {/* Tabs Content */}
      {selectedTab === 'feedback' && (
        <div>
          {feedbackList?.length === 0 ? (
            <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback record found</h2>
          ) : (
            <>
              <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
              <h2 className='font-bold text-2xl'>Here is your interview Feedback</h2>
              <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>
              <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, your answer and feedback for improvement</h2>
              {feedbackList && feedbackList.length > 0 ? (
                feedbackList.map((item, index) => (
                  <Collapsible key={index} className='mt-2'>
                    <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
                      {item.question}<ChevronsUpDown className='h-5 w-5'/>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className='flex flex-col gap-2'>
                        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-500'><strong>Your Answer: </strong>{item.userAns}</h2>
                        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-500'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-500'><strong>Feedback: </strong>{item.feedback}</h2>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))
              ) : (
                <p>No feedback available yet.</p>
              )}
            </>
          )}
        </div>
      )}

{selectedTab === 'video' && (
  <div>
    <h2 className="text-2xl font-bold mb-4">Video Analysis</h2>
    <div className="flex space-x-8">
      <div className="w-1/2">
        <EmotionGraph emotionData={emotionData} />
      </div>
      <div className="w-1/2">
        <EmotionAnalysis emotionData={emotionData} />
      </div>
    </div>
  </div>
)}


      {selectedTab === 'audio' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Audio Analysis</h2>
          {/* Add your audio analysis component here */}
          <p>Audio analysis details would be here.</p>
        </div>
      )}

      <Button onClick={() => {router.replace("/dashboard")}} className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-gray-600">
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
