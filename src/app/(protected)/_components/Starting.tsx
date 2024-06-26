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
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-950 text-white px-4 py-12 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          <span className="block">Welcome to</span>
          <span className="block text-blue-400">DocViz Services</span>
        </h1>
        <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
          Upload a DOCX, PDF, or TXT file, an        </p>
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
          <h2 className="text-2xl font-bold">How it works</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-indigo-900 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-lg font-medium">1. Upload</div>
                <div className="mt-1 text-sm text-gray-300">Select and upload your document</div>
              </div>
            </div>
            <div className="bg-indigo-900 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-lg font-medium">2. Analyze</div>
                <div className="mt-1 text-sm text-gray-300">Our AI processes your document</div>
              </div>
            </div>
            <div className="bg-indigo-900 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-lg font-medium">3. Review</div>
                <div className="mt-1 text-sm text-gray-300">Get insights and summaries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Starting;