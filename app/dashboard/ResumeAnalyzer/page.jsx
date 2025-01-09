"use client";
import React, { useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import ResumeScoreSuggestions from "./ResumeScoreSuggestions";

GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const fileURL = URL.createObjectURL(uploadedFile);
    setFile(uploadedFile);
    setPdfFile(fileURL);
    setScore(null);
    setSuggestions([]);
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    let content = "";

    try {
      if (file.type === "application/pdf") {
        content = await extractTextFromPDF(file);
      } else if (file.type === "text/plain") {
        content = await extractTextFromTxt(file);
      } else {
        alert("Unsupported file type. Please upload a .pdf or .txt file.");
        setIsAnalyzing(false);
        return;
      }

      const resumeScore = (Math.random() * 4 + 6).toFixed(1); // Random score for demo
      const enhancements = generateSuggestions(content);

      setScore(resumeScore);
      setSuggestions(enhancements);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("An error occurred while analyzing the resume.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }

    return text;
  };

  const extractTextFromTxt = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsText(file);
    });
  };

  const generateSuggestions = (content) => {
    const suggestions = [];
    if (!content.toLowerCase().includes("achievements")) {
      suggestions.push("Add a section for measurable achievements.");
    }
    if (!content.toLowerCase().includes("skills")) {
      suggestions.push("Include relevant technical and soft skills.");
    }
    if (!content.toLowerCase().includes("experience")) {
      suggestions.push("Add a detailed work experience section.");
    }
    if (content.length < 500) {
      suggestions.push("Expand descriptions to provide more detail.");
    }
    if (!content.toLowerCase().includes("keywords")) {
      suggestions.push(
        "Include industry-specific keywords to optimize your resume for applicant tracking systems (ATS)."
      );
    }
    if (!content.toLowerCase().includes("awards")) {
      suggestions.push("Highlight any awards or recognitions you have received.");
    }
    if (!content.toLowerCase().includes("languages")) {
      suggestions.push(
        "List any languages you speak fluently, especially if relevant to the job."
      );
    }
    if (!content.toLowerCase().includes("volunteer")) {
      suggestions.push(
        "Consider adding a section for volunteer experience or community involvement."
      );
    }

    return suggestions;
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Heading, Paragraph, Upload & Suggestions */}
        <div>
          <h2 className="font-bold text-2xl">Resume Analyzer</h2>
          <p className="text-gray-500 mb-4">
            Upload your resume to receive a score and suggestions for improvement.
          </p>

          <div
            className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
            onClick={() => document.getElementById("file-input").click()}
          >
            <h2 className="text-lg">+ Choose File</h2>
          </div>
          <input
            id="file-input"
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          {file && (
            <div className="mt-4">
              <p>Selected File: {file.name}</p>
              <button
                className="mt-2 p-2 bg-primary text-white rounded hover:bg-blue-600 transition-all"
                onClick={analyzeResume}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          )}

          <div className="mt-6">
            <ResumeScoreSuggestions score={score} suggestions={suggestions} />
          </div>
        </div>

        {/* Right Side: PDF Viewer */}
        <div className="flex-1 max-w-2xl border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex justify-center">
          {pdfFile ? (
            <iframe
              src={pdfFile}
              title="Uploaded PDF"
              className="w-full h-[90vh] border-none"
            ></iframe>
          ) : (
            <p className="text-gray-500">No PDF uploaded. Please select a file.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
