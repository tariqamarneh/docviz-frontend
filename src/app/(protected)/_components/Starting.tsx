"use client"
import React from "react";
import UploadFile from "@/app/(protected)/_components/UploadFile";

interface StartingProps {
  setFileId: (fileId: string) => void;
  setSummary: (summary: string) => void;
  setKeyData: (keyData: string) => void;
  setInsights: (insights: string) => void;
  setError: (error: string | null) => void;
  summary: string | undefined | null;
}


  const Starting: React.FC<StartingProps> = ({ 
  setFileId, 
  setSummary, 
  setKeyData, 
  setInsights, 
  summary, 
  setError 
}) => {
  if (summary) {
    return null; // Don't render anything if there's a summary
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-teal-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-indigo-600 dark:text-indigo-400">DocViz Services</span>
          </h1>
          <p className="mt-3 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
            Upload a DOCX, PDF, or TXT file, and get a detailed analysis with ChatGPT. Our service provides you with a concise summary, highlights key phrases, and extracts valuable insights from your documents.
          </p>
          <div className="mt-5 sm:mt-8">
            <UploadFile
              setFileId={setFileId}
              setSummary={setSummary}
              setKeyData={setKeyData}
              setInsights={setInsights}
              setError={setError}
            />
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How it works</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="text-lg font-medium text-gray-900 dark:text-white">1. Upload</div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select and upload your document</div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="text-lg font-medium text-gray-900 dark:text-white">2. Analyze</div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Our AI processes your document</div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="text-lg font-medium text-gray-900 dark:text-white">3. Review</div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get insights and summaries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default Starting;