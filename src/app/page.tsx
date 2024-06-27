"use client"
import TextScramble from "@/components/ani";
import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-teal-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <NavBar />
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] relative z-10">
        <div className={`text-center transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="mb-6 text-6xl font-extrabold text-gray-900 dark:text-white md:text-7xl lg:text-8xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Doc</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600">Viz</span>
          </h1>
          <p className="mb-8 text-xl font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Elevate your digital experience with our advanced document analyzer. Summarize, extract key insights, and revolutionize your document interactions using ChatGPT-4.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-full hover:from-blue-600 hover:to-teal-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <TextScramble text="Get Started"/>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}