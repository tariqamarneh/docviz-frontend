import { fetchEventSource } from "@microsoft/fetch-event-source";

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

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users/token', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: '',
      username: email,
      password: password,
      scope: '',
      client_id: '',
      client_secret: '',
    }),
  });

  return response;
}


export const fetchUserData = async (token_type: string | undefined, token: string | undefined) => {
  const userResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users/me', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${token_type} ${token}`,
    },
  });

  if (userResponse.status == 401) {
    throw new Error('Please login first.');
  }
  if (userResponse.status != 200) {
    throw new Error('An error occurred.');
  }

  const userData: User = await userResponse.json();
  return userData;
};


export const fetchSessions = async (user_id: string, token_type: string | undefined, token: string | undefined) => {
  const sessionResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/sessions/get_by_user_id?user_id=${user_id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${token_type} ${token}`,
    },
  });

  if (sessionResponse.status == 200) {
    const sessionData: SessionData[] = await sessionResponse.json();
    return sessionData;
  } else if (sessionResponse.status == 404) {
    return [];
  } else {
    throw new Error('An error occurred.');
  }
};


export const submitContactForm = async (formData: { name: string; email: string; message: string }, token_type: string | undefined, token: string | undefined) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users/contact', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': `${token_type} ${token}`
    },
    body: JSON.stringify(formData),
  });
  if (response.status == 200) {
    return response;
  } else if (response.status == 422) {
    throw new Error('Email must be valid.');
  } else if (response.status == 401) {
    throw new Error('Please login first.');
  } else {
    throw new Error('An error occurred.');
  }
};


export const deleteSession = async (sessionId: string, sessions: SessionData[], token_type: string | undefined, token: string | undefined) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/sessions/delete/${sessionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${token_type} ${token}`,
      'accept': 'application/json',
    },
  });
  if (response.status == 200) {
    const newSessions = sessions.filter((session) => session.id !== sessionId);
    return newSessions;
  } else {
    throw new Error('An error occurred.');
  }
};


export const createSession = async (token_type: string | undefined, token: string | undefined) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/sessions/create', {
    method: 'POST',
    headers: {
      'Authorization': `${token_type} ${token}`,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {},
      expires_in_minutes: 60 * 24 * 30
    }),
  });
  if (response.ok) {
    const sessionData = await response.json();
    const sessionId = sessionData.id;
    return sessionId;
  } else {
    throw new Error('Please login first.');
  }
};


export const saveFile = async (sessionId: string, formData: FormData, token_type: string | undefined, token: string | undefined) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/files/upload?session_id=${sessionId}`, {
    method: 'POST',
    headers: {
      'Authorization': `${token_type} ${token}`,
      'accept': 'application/json'
    },
    body: formData
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else if (response.status == 401) {
    throw new Error('Please login first.');
  } else {
    throw new Error('Please upload a file first.');
  }
};


export const generateSummary = async (fileId: string, sessionId: string, setSummary: (summary: string | any) => void, setKeyData: (keyData: string | any) => void, token_type: string | undefined, token: string | undefined) => {
  let summaryFlag = true;
  let keyFlag = true;
  let scrollFlag = true;

  await fetchEventSource(process.env.NEXT_PUBLIC_BACKEND_URL + `/openai/get_summary?file_id=${fileId}&session_id=${sessionId}`, {
    method: "POST",
    headers: {
      'Authorization': `${token_type} ${token}`,
      'accept': 'application/json',
    },
    openWhenHidden: true,
    async onopen(res) {
      if (res.ok && res.status === 200) {
        return
      } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        throw new Error("Client-side error, please try again later.");
      }
    },
    onmessage(event) {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === 'summary' && parsedData.data && parsedData.index != 1 && summaryFlag) {
        if (parsedData.data == " \"" || parsedData.data == ".\",\n") {
          summaryFlag = false;
        } else {
          setSummary((data: string[]) => [...data, parsedData.data]);
        }
      } else if (parsedData.type === 'key' && parsedData.data && parsedData.index != 1 && keyFlag) {
        if (parsedData.data == "\"\n") {
          keyFlag = false;
        } else {
          if (scrollFlag) {
            window.scrollTo({ top: window.innerHeight / 1.25, behavior: 'smooth' });
            scrollFlag = false;
          }
          setKeyData((prevKeyData: string) => `${prevKeyData}${parsedData.data}`);
        }
      }
    },
    onclose() {
      return;
    },
    onerror(err) {
      throw new Error(err.message);
    },
  });
};


export const generateInsights = async (sessionId: string, setInsights: (insights: string | any) => void, token_type: string | undefined, token: string | undefined) => {
  let instightsFlag = true;
  let scrollFlag = true;
  await fetchEventSource(process.env.NEXT_PUBLIC_BACKEND_URL + `/openai/get_insights?session_id=${sessionId}`, {
    method: "POST",
    headers: {
      'Authorization': `${token_type} ${token}`,
      'accept': 'application/json',
    },
    openWhenHidden: true,
    async onopen(res) {
      if (res.ok && res.status === 200) {
        return;
      } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        throw new Error("Client-side error, Please try again later.");
      }
    },
    onmessage(event) {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === 'inst' && parsedData.data && parsedData.index != 1 && instightsFlag) {
        if (parsedData.data == " \"" || parsedData.data == ".\"\n") {
          instightsFlag = false;
        } else {
          if (scrollFlag) {
            window.scrollTo({ top: (window.innerHeight / 1.25) * 2, behavior: 'smooth' });
            scrollFlag = false;
          }
          setInsights((data: string[]) => [...data, parsedData.data]);
        }
      }
    },
    onclose() {
      return;
    },
    onerror(err) {
      throw new Error(err.message);
    },
  });
};