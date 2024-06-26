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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Welcome to</span>
          <span className="block text-indigo-600 dark:text-indigo-400">DocViz Services</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
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
  );
}

export default Starting;