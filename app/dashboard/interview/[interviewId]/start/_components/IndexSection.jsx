import React from 'react'

function IndexSection({ mockInterviewQuestion, activeQuestionIndex }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-2">
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2
            key={question.id || index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQuestionIndex === index && 'bg-blue-700 text-white'}`}
          >
            {index + 1}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default IndexSection;
