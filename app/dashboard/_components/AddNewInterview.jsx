"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { uuid } from 'drizzle-orm/pg-core';

function AddNewInterview() {
    const[openDialog,setOpenDialog]=useState(false);
    const[jobPosition,setJobPosition]=useState();
    const[jobDesc,setJobDesc]=useState();
    const[jobExperience,setJobExperience]=useState();
    const[loading,setLoading]=useState(false);
    const[jsonResponse,setJsonResponse]=useState([]);
    const router=useRouter();
    const{user}=useUser();

    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition,jobDesc,jobExperience);

        const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDesc+",years of Experience:"+jobExperience+", Depends on this information please ggive me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions with answers in Json format, Give question and answer as fields in JSON"
        
        const result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);
        if(MockJsonResp){
        const resp=await db.insert(MockInterview)
        .values({
            jsonMockResp:MockJsonResp,
            jobPosition:jobPosition,
            jobDesc:jobDesc,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy'),
            mockId:uuidv4(),
        }).returning({mockId:MockInterview.mockId});


        console.log("Inserted ID:",resp)
        if(resp){
            setOpenDialog(false);
            router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
    }
    else{
        console.log("ERROR");
    }
        setLoading(false);
    
    }
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md
        cursor-pointer transition-all'
        onClick={()=>setOpenDialog(true)}>
                <h2 className=' text-lg'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
               
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                        <form onSubmit={onSubmit}>
                            <div>
                                <h2>Add details about your job position/role, Job description, years of experience</h2>
                                <div className='mt-7 my-3'>
                                    <label>Job role/Job position</label>
                                    <Input placeholder="Ex. Full satck developer" required
                                    onChange={(event)=>setJobPosition(event.target.value)}
                                    />
                                </div>
                                <div className=' my-3'>
                                    <label>Job description/Tech Stack(In short)</label>
                                    <Textarea placeholder="Ex. React, Angular, Cloud, Mysql etc" required
                                    onChange={(event)=>setJobDesc(event.target.value)}/>
                                </div>
                                <div className=' my-3'>
                                    <label>Years of Experience</label>
                                    <Input placeholder="Ex. 3" type="number"max="50" required
                                    onChange={(event)=>setJobExperience(event.target.value)}/>
                                </div>
                            </div>
                            <div className='flex gap-5 justify-end'>
                                <Button type="button"variant="ghost" onClick={()=>setOpenDialog(false)}>Cancle</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading?
                                    <>
                                    <LoaderCircle className='animate-spin'/>Generating from AI</>
                                    :'Start Interview'
                                    }

                                    </Button>
                            </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview