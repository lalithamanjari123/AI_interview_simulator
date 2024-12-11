"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { UserAnswer} from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const[userAnswer,setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(()=>{
        results.map((result)=>{
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        })
      },[results])

      useEffect(()=>{
        if(!isRecording && userAnswer.length>10){
            UpdateUserAnswer();
        }
        /*if(userAnswer?.length<10){
            setLoading(false);
            toast('Error while saving your answer, please record again')
            return;
        }*/
        

      },[userAnswer,isRecording])

      const StartStopRecording=async()=>{
        if(isRecording){
            
            stopSpeechToText();
            
        }
        else{
            startSpeechToText();
        }
      }

      const UpdateUserAnswer = async () => {
        try {
          // Check if essential data is available
          if (!interviewData || !mockInterviewQuestion[activeQuestionIndex]) {
            toast.error('Interview data or question data is missing.');
            return;
          }
    
          setLoading(true);
          console.log('User Answer:',userAnswer);
    
          const feedbackPrompt = `
            Question: ${mockInterviewQuestion[activeQuestionIndex]?.question},
            User Answer: ${userAnswer},
            Please provide a rating and feedback for the given answer based on the question.
            Respond in JSON format with fields: rating and feedback.
          `;
    
          const result = await chatSession.sendMessage(feedbackPrompt);
          const mockJsonResp = (await result.response.text())
            .replace('```json', '')
            .replace('```', '');
          const JsonFeedbackResp = JSON.parse(mockJsonResp);
    
          console.log('Feedback Response:', JsonFeedbackResp);
    
          const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy'),
          });
    
          if (resp) {
            toast.success('User Answer Recorded successfully.');
             setUserAnswer('');
             setResults([])
          }
        } catch (error) {
          console.error('Error while saving user answer:', error);
          toast.error('Error while saving your answer, please try again.');
        } finally {
          setResults([])
          setUserAnswer(''); // Clear the answer after saving
          setLoading(false); // Reset loading state
        }
      };
  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col mt-20 bg-slate-600 justify-center items-center bg-secondary rounded-lg p-5'>
        <Image src={'/webcam.png'} width={200} height={200}
        className='absolute' alt='WebCam'/>
      <Webcam
      mirrored={true}
      style={
        {
            height:300,
            width:'100%',
            zIndex:10,
        }
      }/>
    </div>
    <Button disabled={loading} variant="outline" className="my-20" onClick={StartStopRecording}>
        {isRecording?
        <h2 className='text-red-600 flex gap-2'>
        <StopCircle/>Stop Recording
        </h2>
        :
         
         <h2 className='text-primary flex gap-2'><Mic/>Record Answer</h2>
        }</Button>
    </div>
  )
}

export default RecordAnswerSection
