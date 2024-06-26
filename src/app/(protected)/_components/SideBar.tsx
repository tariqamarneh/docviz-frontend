"use client";
import { deleteSession } from "@/actions/apiService";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useEffect, useState } from "react";

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

interface SideBarProps {
  setIsOpened: (isOpened: boolean) => void;
  isOpened: boolean;
  sessions: SessionData[];
  setSession: (sessions: SessionData[]) => void;
  setSummary: (summary: string) => void;
  setKeyData: (keyData: string) => void;
  setInsights: (insights: string) => void;
  setError: (error: string | null) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  setIsOpened,
  isOpened,
  setSession,
  sessions,
  setSummary,
  setKeyData,
  setInsights,
  setError,
}) => {
  const { token_type, token } = useCurrentUser(); 
  const [touchStartX, setTouchStartX] = useState(0);

  const handleSessionClick = (session: SessionData) => {
    setSummary(session.data.summary);
    setKeyData(session.data.key_phrases);
    setInsights(session.data.insights);
  };

  const handleDeleteClick = async (sessionId: string) => {
    try {
      const newSessions = await deleteSession(sessionId, sessions, token_type, token)
      setSession(newSessions);
    } catch (error:any) {
      setError(error.message);
    }
  };

  const handleNewClick = () => {
    setSummary("");
    setKeyData("");
    setInsights("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (diff > 50) {
        setIsOpened(false);
      } else if (diff < -50) {
        setIsOpened(true);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [setIsOpened, touchStartX]);

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white overflow-hidden transition-transform duration-300 ease-in-out ${
      isOpened ? 'translate-x-0' : '-translate-x-full'
    } flex flex-col`}>
      <div className="flex-1 overflow-y-auto py-4 px-3 mt-16">
        <h2 className="text-lg font-semibold mb-4">Document History</h2>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session.id} className="mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <button 
                onClick={() => handleSessionClick(session)}
                className="w-full text-left"
              >
                <div className="font-medium truncate">{session.data.file_name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatDate(session.created_at)}
                </div>
              </button>
              <button 
                onClick={() => handleDeleteClick(session.id)}
                className="mt-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">No history yet</div>
        )}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleNewClick}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors duration-200"
        >
          Upload New File
        </button>
      </div>
    </aside>
  );

};

export default SideBar;