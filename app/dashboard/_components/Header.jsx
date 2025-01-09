"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log(path);
  }, [path]);

  const handleResumeBuilderClick = () => {
    router.push("/dashboard/ResumeBuilder");
  };
  const handleResumeAnalyzerClick = () => {
    router.push("/dashboard/ResumeAnalyzer");
  };

  const handleInterviewClick = () => {
    router.push("/dashboard");
  };

  const handleHomeClick = () => {
    router.push("/"); // Navigates to the homepage
  };



  return (
    <nav className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">
          Interview<span className="text-xl text-black">AI</span>
        </div>

        {/* Menu Items */}
        <ul className="hidden md:flex space-x-10 text-gray-700">
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/" ? "text-primary font-bold text-blue-500" : ""
            }`}
            onClick={handleHomeClick}
          >
            Home
          </li>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard" ? "text-primary font-bold text-blue-500" : ""
            }`}
            onClick={handleInterviewClick}
          >
            Interview
          </li>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/ResumeBuilder"
                ? "text-primary font-bold text-blue-500"
                : ""
            }`}
            onClick={handleResumeBuilderClick}
          >
            Resume Builder
          </li>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/ResumeAnalyzer"
                ? "text-primary font-bold text-blue-500"
                : ""
            }`}
            onClick={handleResumeAnalyzerClick}
          >
            Resume Analyser
          </li>
         {/* <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/courses" ? "text-primary font-bold text-blue-500" : ""
            }`}
          >
            Courses
          </li>*/}
        </ul>
        <div className="hidden md:flex">
          <UserButton />
        </div>

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
          <li
            className={`text-black hover:text-primary cursor-pointer ${
              path === "/" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={handleHomeClick}
          >
            Home
          </li>
          <li
            className={`text-black hover:text-primary cursor-pointer ${
              path === "/dashboard" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={handleInterviewClick}
          >
            Interview
          </li>
          <li
            className={`text-black hover:text-primary cursor-pointer ${
              path === "/dashboard/ResumeBuilder" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={handleResumeBuilderClick}
          >
            Resume Builder
          </li>
          <li
            className={`text-black hover:text-primary cursor-pointer ${
              path === "/dashboard/ResumeAnalyzer" ? "text-blue-500 font-bold" : ""
            }`}
          >
            Resume Analyser
          </li>
          <li
            className={`text-black hover:text-primary cursor-pointer ${
              path === "/courses" ? "text-blue-500 font-bold" : ""
            }`}
          >
            Courses
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Header;
