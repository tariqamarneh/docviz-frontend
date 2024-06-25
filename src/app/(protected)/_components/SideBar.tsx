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
  isOpend: boolean;
  sessions: SessionData[];
  setSession: (sessions: SessionData[]) => void;
  setSummary: (summary: string) => void;
  setKeyData: (keyData: string) => void;
  setInsights: (insights: string) => void;
  setError: (error: string | null) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  setIsOpened,
  isOpend,
  setSession,
  sessions,
  setSummary,
  setKeyData,
  setInsights,
  setError,
}) => {
  const [Rotate, setRotate] = useState(0);
  const [color, setColor] = useState("");
  const { token_type, token } = useCurrentUser(); 
  let touchStartX = 0;
  let touchEndX = 0;

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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');
    return `${day}-${month}-${year} at ${hours}:${minutes}`;
};


  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    };

    const handleSwipeGesture = () => {
      if (touchStartX - touchEndX > 50) {
        setIsOpened(false);
      }

      if (touchEndX - touchStartX > 50) {
        setIsOpened(true);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className={`flex flex-row  ease-out duration-200 h-[100vh]`}>
      <div className={`w-[100%] bg-gray-300 dark:bg-gray-700 overflow-y-auto h-[100vh]`}>
        <div className="flex flex-col w-[100%] h-[100vh] items-center justify-start pt-20">
          <div className="flex flex-col w-full justify-start items-center h-[calc(100vh-4rem)] mb-[4rem] overflow-y-auto">
            {sessions.length > 0 ? (<>
            {sessions.map((session) => (
              <div
                key={session.id}
                className="w-[95%] p-2 my-1 bg-gray-200 dark:bg-gray-600 text-left rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 ease-in-out"
              >
                <div className="flex flex-row justify-between">
                  <button 
                    key={session.id}
                    onClick={() => handleSessionClick(session)}
                    className="flex flex-col text-left w-5/6">
                    <div>{session.data.file_name}</div>
                    <div className="text-sm text-gray-400">
                      {formatDate(session.created_at)}
                    </div>
                  </button>
                  <button className="mr-2 text-red-500" onClick={() => handleDeleteClick(session.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" className="fill-current text-black dark:text-white">
                      <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}</>):(<div className=" flex h-full items-center justify-center text-gray-600 dark:text-gray-400">No histories yet</div>)}
          </div>
          <div className="w-full flex items-center justify-center fixed bottom-0 pb-4">
            <button
              className="w-[90%] p-2 bg-gray-200 dark:bg-gray-600 text-left flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 ease-in-out"
              onClick={() => handleNewClick()}
            >
              <div>Upload new file</div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-fill-available justify-center items-end">
        <div
          className="cursor-pointer mt-5 mb-5 hover:{}"
          onClick={() => {
            setIsOpened(!isOpend);
          }}
          onMouseEnter={() => {
            setRotate(35);
            setColor("bg-gray-600 dark:bg-gray-100");
          }}
          onMouseLeave={() => {
            setRotate(0);
            setColor("bg-gray-400 dark:bg-gray-300");
          }}
        >
          <div
            className={`h-4 w-1 rounded-full bg-gray-400 ml-2 translate-y-[2.5px] transition-transform duration-200 transform origin-center ${color} ${isOpend ? `-rotate-[-${Rotate}deg]` : "-rotate-[35deg]"
              }`}
          ></div>
          <div
            className={`h-4 w-1 rounded-full bg-gray-400 ml-2 -translate-y-[2.5px] transition-transform duration-200 transform origin-center ${color} ${isOpend ? `-rotate-[${Rotate}deg]` : "-rotate-[-35deg]"
              }`}
          ></div>
        </div>
      </div>
    </div>
  );

};
export default SideBar;
