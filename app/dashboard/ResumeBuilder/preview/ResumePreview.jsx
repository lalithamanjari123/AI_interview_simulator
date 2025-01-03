"use client"
import { useState } from "react";
const ResumePreview = ({ formData }) => {
    return (
      <div className="space-y-4">
        <div className="text-2xl font-semibold">{formData.personalDetails.name}</div>
        <div>{formData.personalDetails.email} | {formData.personalDetails.phone}</div>
        <div className="mt-4">
          <div className="font-semibold">Summary</div>
          <p>{formData.summary}</p>
        </div>
        <div className="mt-4">
          <div className="font-semibold">Education</div>
          <p>{formData.education}</p>
        </div>
        <div className="mt-4">
          <div className="font-semibold">Experience</div>
          <p>{formData.experience}</p>
        </div>
        <div className="mt-4">
          <div className="font-semibold">Skills</div>
          <p>{formData.skills}</p>
        </div>
      </div>
    );
  };
  
  export default ResumePreview;
  