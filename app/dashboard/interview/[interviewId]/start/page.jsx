"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EndInterviewButton from './EndInterviewButton';

function StartInterview({ params }) {

    const [interviewData, setInterviewData] = useState(null); // Initialize as null to avoid undefined issues
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    const interviewId = React.use(params)?.interviewId;

    React.useEffect(() => {
        if (interviewId) {
            console.log("id:", interviewId);
            GetInterviewDetails();
        }
    }, [interviewId]);


    useEffect(() => {
        // Log the interviewData and mockInterviewQuestion after they are set
        console.log("Updated interviewData:", interviewData);
        console.log("Updated mockInterviewQuestion:", mockInterviewQuestion);
    }, [interviewData, mockInterviewQuestion]);

    /**
     * used to get interview details by mockId/Interview id
     */
    const GetInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId)); // Use the filter here

            console.log("result:", result);
            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                console.log("Json:", jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]);
            } else {
                console.log("No interview found with this ID.");
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/*Questions */}
                {mockInterviewQuestion ? (
                    <QuestionsSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                    />
                ) : (
                    <p>Loading questions...</p>
                )}

                {/*Video and Audio recording */}
                {interviewData ? (
                    <RecordAnswerSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                    />
                ) : (
                    <p>Loading interview details...</p>
                )}
            </div>
            <div className='flex justify-end gap-6'>
              {activeQuestionIndex>0 &&
              <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
              {activeQuestionIndex!=mockInterviewQuestion?.length-1 && 
              <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
              {/*{activeQuestionIndex==mockInterviewQuestion?.length-1 && 
              
              <EndInterviewButton/>
              }*/}
            </div>
        </div>
    );
}

export default StartInterview;
