"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import Starting from "../_components/Starting";
import Card from "../_components/Card";
import { useEffect, useState } from "react";
import SideBar from "../_components/SideBar";
import Navbar from "@/components/Navbar";
import Error from "../_components/Error";
import { signOut } from "next-auth/react";
import Footer from "../_components/Footer";
import { fetchUserData, fetchSessions } from "@/actions/apiService";


interface User {
  id: string;
  email: string;
  full_name: string;
}

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


export default function Home() {

  const { token_type, token } = useCurrentUser();
  const [fileId, setFileId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [keyData, setKeyData] = useState<string>('');
  const [insights, setInsights] = useState<string>('');
  const [isOpend, setIsOpend] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const userData = await fetchUserData(token_type, token);
        setUserId(userData.id);
        const sessionData1 = await fetchSessions(userData.id, token_type, token);
        const sessionData = sessionData1.slice().reverse(); 
        setSessions(sessionData);
      } catch (error:any) {
        setError(error.message);
        if (error.message === 'Please login first.') {
          signOut();
        }
      }
    };

    if (!token_type || !token) {
      window.location.reload();
    } else {
      fetchData();
    }

  }, [token_type, token]);


  const style = isOpend ? "translate-x-0" : `-translate-x-[96.5%]`;

  
  return (
    <div className="h-fill-available">
      <Error message={error} setError={setError} />
      <div className="fixed w-screen z-50">
        <Navbar />
      </div>
      <div className={`w-[20rem] h-fill-available fixed transition-transform duration-300 ease-in-out z-40 ${style}`}>
        <SideBar
          setIsOpened={setIsOpend}
          isOpend={isOpend}
          sessions={sessions}
          setSession={setSessions}
          setSummary={setSummary}
          setKeyData={setKeyData}
          setInsights={setInsights}
          setError={setError}
        />
      </div>
      <Starting setFileId={setFileId} setSummary={setSummary} setKeyData={setKeyData} setInsights={setInsights} summary={summary} setError={setError}/>
      <Card summary={summary} keyData={keyData} insights={insights}/>
      <Footer summary={summary}/>
    </div>
  );
}