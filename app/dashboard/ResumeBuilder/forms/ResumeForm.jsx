"use client"
import { useState } from "react";

const ResumeForm = ({ onFormSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      email: "",
      phone: "",
    },
    summary: "",
    education: "",
    experience: "",
    skills: "",
  });

  const steps = [
    "Personal Details",
    "Summary",
    "Education",
    "Experience",
    "Skills",
  ];

  const handleChange = (e, section, field) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: e.target.value,
      },
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    onFormSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold">{steps[currentStep]}</div>

      {currentStep === 0 && (
        <div>
          <input
            type="text"
            placeholder="Name"
            className="input"
            value={formData.personalDetails.name}
            onChange={(e) => handleChange(e, "personalDetails", "name")}
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={formData.personalDetails.email}
            onChange={(e) => handleChange(e, "personalDetails", "email")}
          />
          <input
            type="text"
            placeholder="Phone"
            className="input"
            value={formData.personalDetails.phone}
            onChange={(e) => handleChange(e, "personalDetails", "phone")}
          />
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <textarea
            placeholder="Summary"
            className="textarea"
            value={formData.summary}
            onChange={(e) => handleChange(e, "summary", "")}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <input
            type="text"
            placeholder="Education"
            className="input"
            value={formData.education}
            onChange={(e) => handleChange(e, "education", "")}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <textarea
            placeholder="Experience"
            className="textarea"
            value={formData.experience}
            onChange={(e) => handleChange(e, "experience", "")}
          />
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <input
            type="text"
            placeholder="Skills"
            className="input"
            value={formData.skills}
            onChange={(e) => handleChange(e, "skills", "")}
          />
        </div>
      )}

      <div className="flex space-x-4">
        {currentStep > 0 && (
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
          >
            Prev
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            className="btn btn-primary"
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {currentStep === steps.length - 1 && (
          <button
            className="btn btn-success"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
