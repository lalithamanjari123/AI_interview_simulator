"use client"
import React,{useState} from 'react'
import ResumeForm from './forms/ResumeForm';
import ResumePreview from './preview/ResumePreview';

function resumeBuilder() {
    const [formData, setFormData] = useState(null);

    const handleFormSubmit = (data) => {
      setFormData(data);
    };
  
  return (
    <div className="flex justify-between p-8">
      <div className="w-1/2">
        <ResumeForm onFormSubmit={handleFormSubmit} />
      </div>
      <div className="w-1/2 border-l pl-8">
        {formData && <ResumePreview formData={formData} />}
      </div>
    </div>
  )
}

export default resumeBuilder
