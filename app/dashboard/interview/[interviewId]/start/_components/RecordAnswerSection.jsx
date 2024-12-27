"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState,useRef } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { UserAnswer} from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import EmotionAnalysis from '../../feedback/EmotionAnalysis'
import EmotionGraph from '../../feedback/EmotionGraph'
import EndInterviewButton from '../EndInterviewButton'
import * as faceapi from 'face-api.js';

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
      const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [emotionData, setEmotionData] = useState([]);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.ageGenderNet.loadFromUri('/models');
    };

    const startVideo = async () => {
      await loadModels();
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    startVideo();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInterviewEnded) {
        detectEmotions();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isInterviewEnded]);

  const detectEmotions = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const detections = await faceapi.detectAllFaces(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceExpressions().withAgeAndGender();

    if (detections.length > 0) {
      setFaceDetected(true);
      const expressions = detections[0].expressions;
      const highestEmotion = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );
      setEmotion(highestEmotion);

      const { age, gender } = detections[0];
      setAge(Math.round(age));
      setGender(gender);

      setEmotionData((prevData) => [
        ...prevData,
        highestEmotion,
      ]);
    } else {
      setFaceDetected(false);
    }
  };

  const endInterview = () => {
    setIsInterviewEnded(true);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

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
   
      {!isInterviewEnded ? (
        <div>
          <video
            ref={videoRef}
            autoPlay
            muted
            width="500"
            height="300"
            className="border border-gray-300 rounded-md"
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="absolute top-0 left-0"
          />
          {faceDetected ? (
            <div className="mt-4">
              {/*<h2 className="text-lg">Detected Emotion: {emotion}</h2>
              <h2 className="text-lg">Estimated Age: {age}</h2>
              <h2 className="text-lg">Estimated Gender: {gender}</h2>*/}
            </div>
          ) : (
            <h2 className="text-lg text-red-500 mt-4">
              No face detected. Please adjust your position.
            </h2>
          )}
           {activeQuestionIndex==mockInterviewQuestion?.length-1 && 
          <EndInterviewButton onClick={endInterview} interviewData={interviewData} emotionData={emotionData} />}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/*<EmotionGraph emotionData={emotionData} />
          <EmotionAnalysis emotionData={emotionData} />*/}
        </div>
      )}
  
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