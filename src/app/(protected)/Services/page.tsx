"use client"
import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Navbar from "@/components/Navbar";
import SideBar from "@/app/(protected)/_components/SideBar";
import Starting from "@/app/(protected)/_components/Starting";
import Card from "@/app/(protected)/_components/Card";
import Error from "@/app/(protected)/_components/Error";
import Footer from "@/app/(protected)/_components/Footer";
import { fetchUserData, fetchSessions } from "@/actions/apiService";
import { signOut } from "next-auth/react";

interface SessionData {
  id: string;
  user_id: string;
  data: {
    file_name: string;
    summary: string;
    key_phrases: string;
    insights: string;
  };
  created_at: string;
  expires_at: string;
}

export default function Services() {
  const { token_type, token } = useCurrentUser();
  const [isOpened, setIsOpened] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [keyData, setKeyData] = useState<string>('');
  const [insights, setInsights] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token_type || !token) {
        window.location.reload();
        return;
      }

      try {
        const userData = await fetchUserData(token_type, token);
        setUserId(userData.id);
        const sessionData = await fetchSessions(userData.id, token_type, token);
        setSessions(sessionData.reverse());
      } catch (error: any) {
        setError(error.message);
        if (error.message === 'Please login first.') {
          signOut();
        }
      }
    };

    fetchData();
  }, [token_type, token]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-indigo-950">
      <Navbar />
      <Error message={error} setError={setError} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar 
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          sessions={sessions}
          setSession={setSessions}
          setSummary={setSummary}
          setKeyData={setKeyData}
          setInsights={setInsights}
          setError={setError}
        />
        <main className="flex-1 overflow-y-auto relative">
          <button
            onClick={() => setIsOpened(!isOpened)}
            className={`fixed top-1/2 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-all duration-300 ${
              isOpened ? 'left-64' : 'left-0'
            }`}
            style={{ transform: 'translateY(-50%)' }}
          >
            <svg 
              className={`w-6 h-6 transition-transform duration-300 ${isOpened ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="h-full">
            <Starting 
              setFileId={setFileId} 
              setSummary={setSummary} 
              setKeyData={setKeyData} 
              setInsights={setInsights} 
              summary={summary}
              setError={setError}
            />
            <Card summary={summary} keyData={keyData} insights={insights} />
          </div>
        </main>
      </div>
      <Footer summary={summary} />
    </div>
  );


}