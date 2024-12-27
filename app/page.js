"use client"
import React,{useState} from "react";
import { useAuth } from "@clerk/nextjs"; // Correct Clerk import
import { useRouter } from "next/navigation"


const HomePage = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Clerk's signed-in status
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isSignedIn);
  const handleGetStarted = () => {
    if (isSignedIn) {
      // Redirect to dashboard if signed in
      router.replace("/dashboard");
    } else {
      // Redirect to sign-in page if not signed in
      router.push("/sign-in");
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the mobile menu
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10 top-0">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-primary">Interview<span className="text-xl  text-black">AI</span></div>

          {/* Menu Items */}
          <ul className="hidden md:flex space-x-10 text-gray-700">
            <li className=" text-black hover:text-primary cursor-pointer">Home</li>
            <li className=" text-black hover:text-primary cursor-pointer">Video Interview</li>
            <li className="text-black hover:text-primary cursor-pointer">Audio Interview</li>
            <li className="text-black hover:text-primary cursor-pointer">Resume Builder</li>
            <li className="text-black hover:text-primary cursor-pointer">Resume Analyser</li>
            <li className="text-black hover:text-primary cursor-pointer">Tech Quiz</li>
            <li className=" text-black hover:text-primary cursor-pointer">Courses</li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 focus:outline-none" onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
          <ul className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
            <li className="text-black hover:text-primary cursor-pointer">Home</li>
            <li className="text-black hover:text-primary cursor-pointer">
              Video Interview
            </li>
            <li className="text-black hover:text-primary cursor-pointer">
              Audio Interview
            </li>
            <li className="text-black hover:text-primary cursor-pointer">
              Resume Builder
            </li>
            <li className="text-black hover:text-primary cursor-pointer">
              Resume Analyser
            </li>
            <li className="text-black hover:text-primary cursor-pointer">
              Tech Quiz
            </li>
            <li className="text-black hover:text-primary cursor-pointer">Courses</li>
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between container mx-auto px-4 py-20 mt-16">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 pl-10">
  <h1 className="text-4xl font-bold text-gray-800 leading-tight">
    Next-Gen <br />
    AI <span className="text-4xl font-bold text-primary">Interview</span> Simulator
  </h1>
  <p className="text-gray-600">
    Experience the future of interview preparation <br />
    with our AI-powered tools. Analyze, improve, and excel in your <br />
    interviews with cutting-edge technology.
  </p>
  <button
    onClick={handleGetStarted}
    className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-blue-700"
  >
    Get Started
  </button>
</div>

        {/* Right Content */}
        <div className="md:w-1/2 mt-5 md:mt-0">
  <img
    src="/homeImage.png"
    alt="AI Interview"
    className="w-100 h-auto rounded-lg shadow-lg"
  />
</div>

      </section>

      {/* Why Us Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 mb-6">
            Our platform offers unique AI-driven insights and personalized feedback
            to ensure you are fully prepared for any interview scenario.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Advanced AI Analysis
              </h3>
              <p className="text-gray-600">
                Get detailed feedback on your performance through advanced
                AI-driven metrics.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Real-Time Feedback
              </h3>
              <p className="text-gray-600">
                Improve dynamically with real-time suggestions and guidance.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Comprehensive Tools
              </h3>
              <p className="text-gray-600">
                Access video analysis, audio evaluation, resume tips, and more.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
