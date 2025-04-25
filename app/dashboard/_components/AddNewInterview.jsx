"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const handleResumeUpload = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setResumeText(result.text);
        console.log("resume Text"+resumeText);
      } else {
        alert("Failed to process the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Resume Text: ${resumeText}. Please provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. Include a mix of general interview questions and basic coding questions (unrelated to the tech stack), such as those involving data structures, algorithms, or problem-solving. Ensure answers are concise and clear.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response.text().replace("```json", "").replace("```", "");
      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db.insert(MockInterview).values({
          jsonMockResp: MockJsonResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
          mockId: uuidv4(),
        }).returning({ mockId: MockInterview.mockId });

        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } else {
        console.error("Error in response.");
      }
    } catch (error) {
      console.error("Error generating interview questions:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add details about your job position/role, job description, and years of experience</h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack (In short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, Cloud, MySQL, etc."
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 3"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Upload Resume (PDF)</label>
                    <Input
                      type="file"
                      accept=".pdf"
                      required
                      onChange={(event) => handleResumeUpload(event.target.files[0])}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;