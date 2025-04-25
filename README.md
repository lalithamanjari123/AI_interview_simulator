🎤 AI Interview Simulator
An interactive AI-powered mock interview platform built with Next.js. It generates real-time questions based on user resumes, evaluates audio responses, provides live feedback, and analyzes gestures. Designed to help users improve interview performance with an engaging, secure experience.

_________________________________________________________________________________________________

📌 Project Overview
Goal: Simulate AI-generated mock interviews with question-answer analysis and feedback.

_________________________________________________________________________________________________
Tech Stack:

Frontend: Next.js, Tailwind CSS

Backend: Node.js (custom server in utils/backend)

Authentication: Clerk

Database: PostgreSQL via Drizzle ORM

AI Services: Gemini API for question generation

Media: Face-api.js, react-speech-recognition, Web Audio API

____________________________________________________________________________________________________
🛠️ Requirements

Install Node.js (v18 or higher recommended).

_____________________________________________________________________________________________________

🚀 Getting Started
1. Clone the Repository

    git clone https://github.com/your-username/ai-interview-simulator.git
    cd ai-interview-simulator
   
2. Install Dependencies

    npm install
    This sets up node_modules and .next folders.

4. Add .env.local File
      Create a .env.local file in the root with the following contents:


          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
          CLERK_SECRET_KEY=sk_test_...
          
          NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
          NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
          NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
          NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
          
          NEXT_PUBLIC_DRIZZLE_DB_URL=postgresql://...
          NEXT_PUBLIC_GEMINI_API_KEY=AIza...
          
          NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=25
          
          NEXT_PUBLIC_INFORMATION="Enable Video Web Cam and Microphone to start..."
          NEXT_PUBLIC_QUESTION_NOTE="Click on record answer and open a editor..."

_____________________________________________________________________________________________________

🗂️ Project Structure

ai-interview-simulator/
├── app/                 # Frontend app (Next.js)
├── components/          # Reusable UI components
├── utils/
│   └── backend/         # Backend server logic (Node.js)
├── public/              # Public assets
├── .env.local           # Environment variables
├── tailwind.config.js   # Tailwind CSS setup
├── package.json         # Project metadata
└── README.md            # Documentation

_____________________________________________________________________________________________________

🧪 Running the Project
Start Frontend
        npm run dev
Start Backend Server
In another terminal:

      cd utils/backend
      node server
View Database (Optional)

      npm run db:studio
This opens your Drizzle Studio interface to inspect or query the PostgreSQL database.

_____________________________________________________________________________________________________

💡 Features
AI-generated questions from resume analysis

Audio-based answer recording with speech-to-text

Feedback with correct answers

Gesture analysis via webcam

Secure, non-recording policy for media input

Personalized improvement suggestions

_____________________________________________________________________________________________________

📊 Example Input/Output
Resume: Uploaded by user
AI: Generates 25 questions
User Answer: Via mic + webcam
Feedback:

Correct/Expected Answer

Your Answer

Improvement Suggestions

Final Score

_____________________________________________________________________________________________________

🙌 Credits
Developed as a major AI project focused on mock interview simulation using real-time multimedia and NLP tools.

