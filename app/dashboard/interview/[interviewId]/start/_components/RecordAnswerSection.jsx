"use client";
import "regenerator-runtime"
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Mic, StopCircle ,Code} from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import Model from './codeArea/Model'
import CodeArea from "./codeArea/page.jsx";
import { db } from '@/utils/db';

import EmotionAnalysis from '../../feedback/EmotionAnalysis';
import EmotionGraph from '../../feedback/EmotionGraph';
import EndInterviewButton from '../EndInterviewButton';
import * as faceapi from 'face-api.js';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const router = useRouter();  
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [emotionData, setEmotionData] = useState([]);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
  const [pitchData, setPitchData] = useState([]);
  const [isAnalyzingPitch, setIsAnalyzingPitch] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Debounced user answer update
  const [debouncedAnswer, setDebouncedAnswer] = useState(userAnswer);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to toggle the modal visibility
  const openCodeEditor = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAnswer(userAnswer);
    }, 1000); // delay of 1 second

    return () => clearTimeout(timer);
  }, [userAnswer]);

  useEffect(() => {
    setUserAnswer(transcript.trim());
  }, [transcript]);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setPitchData([]);
    setRecordingStartTime(Date.now());
    setIsAnalyzingPitch(true);
    setFeedback(null);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsAnalyzingPitch(false);

    const words = transcript.trim().split(/\s+/).length;
    const durationInSeconds = (Date.now() - recordingStartTime) / 1000;
    const wordsPerSecond = words / durationInSeconds;

    // Fluency
    let fluency = "";
    if (wordsPerSecond >= 3) fluency = "High Fluency";
    else if (wordsPerSecond >= 1.5) fluency = "Moderate Fluency";
    else fluency = "Low Fluency";

    // Tone
    const avgPitch = pitchData.length
      ? (pitchData.reduce((a, b) => a + b, 0) / pitchData.length).toFixed(2)
      : 0;
    let tone = "";
    if (avgPitch >= 30) tone = "High Tone";
    else if (avgPitch >= 10) tone = "Moderate Tone";
    else tone = "Low Tone";

    // Pitch Variation
    const pitchVariation = pitchData.length
      ? (Math.max(...pitchData) - Math.min(...pitchData)).toFixed(2)
      : "N/A";

    // Set feedback
    setFeedback({
      transcript,
      fluency,
      tone,
      avgPitch,
      pitchVariation,
    });

    setUserAnswer(''); // Clear user answer after stop
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
    } else {
      startListening();
      setIsRecording(true);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

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

  useEffect(() => {
    if (transcript) {
      setUserAnswer((prevAns) => {
        // Ensure we append the transcript only once and avoid duplication
        return prevAns.includes(transcript) ? prevAns : prevAns + transcript;
      });
    }
  }, [transcript]);
  

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
      setIsRecordingAnswered(true);
    }
  }, [userAnswer, isRecording]);
  const [isRecordingAnswered, setIsRecordingAnswered] = useState(false);

  const UpdateUserAnswer = async () => {
    try {
      if (!interviewData || !mockInterviewQuestion[activeQuestionIndex]) {
        toast.error('Interview data or question data is missing.');
        return;
      }

      setLoading(true);
      console.log('User Answer:', userAnswer);
      console.log("feedback:", feedback);

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
        fluency: feedback?.fluency,
        tone: feedback?.tone,
        avgPitch: feedback?.avgPitch,
        pitchVariation: feedback?.pitchVariation,
      });

      if (resp) {
        toast.success('User Answer Recorded successfully.');
        setUserAnswer('');
      }
    } catch (error) {
      console.error('Error while saving user answer:', error);
      toast.error('Error while saving your answer, please try again.');
    } finally {
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
                {/* Emotion analysis components */}
              </div>
            ) : (
              <h2 className="text-lg text-red-500 mt-4">No face detected. Please adjust your position.</h2>
            )}
            {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
              <EndInterviewButton onClick={endInterview} interviewData={interviewData} emotionData={emotionData} />
            )}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* EmotionGraph and EmotionAnalysis components */}
          </div>
        )}
      </div>
      <div className="flex gap-4">
  {/* Record Answer Button */}
  <Button
    disabled={loading}
    variant="outline"
    className="my-20"
    onClick={toggleRecording}
  >
    {isRecording ? (
      <h2 className="text-red-600 flex gap-2">
        <StopCircle /> Stop Recording
      </h2>
    ) : (
      <h2 className="text-primary flex gap-2"><Mic /> Record Answer</h2>
    )}
  </Button>

  {/* Open Editor Button */}
  <Button
    variant="outline"
    className="my-20"
    onClick={openCodeEditor} // Replace with your actual functionality
  >
    <h2 className="text-primary flex gap-2">
      <Code/>
      Open Editor
    </h2>
  </Button>
  <Model isOpen={isModalOpen} closeModal={closeModal}>
        <CodeArea isOpen={isModalOpen} closeModal={closeModal} setUserAnswer={setUserAnswer}/>
       
      </Model>
</div>
    </div>
  );
}
export default RecordAnswerSection;

