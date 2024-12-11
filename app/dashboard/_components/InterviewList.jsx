"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {

    const {user}=useUser();
    const[interviewList,setInterviewList]=useState([]);

    useEffect(()=>{
        user && GetInterviewList();
    },[user])
    const GetInterviewList = async () => {
        try {
            const result = await db.select()
                .from(MockInterview)  
                .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))  
                .orderBy(desc(MockInterview.id)) 
    
            console.log(result);
            if (result.length > 0) {
                setInterviewList(result);
            } else {
                console.log('No past interviews');
            }
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <div>
        <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
  {interviewList && interviewList.length > 0 ? (
    interviewList.map((interview, index) => (
      <InterviewItemCard key={index} interview={interview} /> // Add `interview` prop to pass data
    ))
  ) : (
    <p>No past interviews available.</p>
  )}
</div>

    </div>
  )
}

export default InterviewList