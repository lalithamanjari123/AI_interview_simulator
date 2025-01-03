"use client";

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useState, useEffect } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import EndInterviewButton from './EndInterviewButton';
import IndexSection from './_components/IndexSection';

function StartInterview({ params }) {
    // Unwrapping params directly
    const interviewId = React.use(params)?.interviewId;

    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        console.log("Interview ID:", interviewId); // Log interviewId
        if (interviewId) {
            fetchInterviewDetails();
        }
    }, [interviewId]);

    useEffect(() => {
        console.log("Interview Data Updated:", interviewData);
        console.log("Mock Interview Questions Updated:", mockInterviewQuestion);
    }, [interviewData, mockInterviewQuestion]);

    /**
     * Fetch interview details using the interview ID.
     */
    const fetchInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            //console.log("Fetched data from database:", result); // Log the result

            if (result.length > 0) {
                //console.log("Raw JSON string:", result[0].jsonMockResp); // Log the raw JSON response

                try {
                    // Clean the JSON string before parsing (remove any extraneous characters)
                    let cleanedJson = result[0].jsonMockResp.trim();

                    // Handle embedded code snippets (e.g., remove backticks or special characters)
                    cleanedJson = cleanedJson.replace(/```/g, ''); // Remove code block markers
                    cleanedJson = cleanedJson.replace(/\\n/g, ''); // Remove newlines if necessary

                    const jsonMockResp = JSON.parse(cleanedJson); // Parse the cleaned JSON string
                    setMockInterviewQuestion(jsonMockResp);
                    setInterviewData(result[0]);
                } catch (parseError) {
                    console.error("Invalid JSON format:", parseError, "Raw data:", result[0].jsonMockResp);
                }
            } else {
                console.log("No interview found for this ID.");
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    return (
        <div className="p-6">
            <IndexSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Questions Section */}
                {mockInterviewQuestion ? (
                    <QuestionsSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                    />
                ) : (
                    <p>Loading questions...</p>
                )}

                {/* Video and Audio Recording Section */}
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

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4 mt-4">
                {activeQuestionIndex > 0 && (
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                        Previous Question
                    </Button>
                )}
                {activeQuestionIndex < (mockInterviewQuestion?.length || 0) - 1 && (
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                        Next Question
                    </Button>
                )}
            </div>
        </div>
    );
}

export default StartInterview;
