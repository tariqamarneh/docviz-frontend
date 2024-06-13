"use client"
import React, { useState, ChangeEvent } from 'react';
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { createSession, generateSummary, saveFile, deleteSession, generateInsights } from '@/actions/apiService';

interface UploadFileProps {
    setFileId: (fileId: string) => void;
    setSummary: (summary: string | any) => void;
    setKeyData: (keyData: string | any) => void;
    setInsights: (insights: string | any) => void;
    setError: (error:string | null) => void;
}


const UploadFile: React.FC<UploadFileProps> = ({ setFileId, setSummary, setKeyData, setInsights, setError }) => {
    const [fileName, setFileName] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { token_type, token } = useCurrentUser();  

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setSelectedFile(file);
        }
    };

    const createSessionAndUploadFile = async () => {
        if (!selectedFile) return;
        setFileId('');
        setSummary('');
        setKeyData('');
        setInsights('');
        setLoading(true);  

        try {
            const sessionId = await createSession(token_type, token);
            await uploadFile(sessionId);
        } catch (error:any) {
            setLoading(false);
            setError(error.message);
            if(error.message === 'Please login first.') {
                signOut();
            }
        }
    };


    const uploadFile = async (sessionId: string) => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const data = await saveFile(sessionId, formData, token_type, token);
            setFileId(data.file_id);
            await getSummary(data.file_id, sessionId);
        } catch (error:any) {
            const _ = await deleteSession(sessionId, [], token_type, token);
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    const getSummary = async (fileId: string, sessionId: string) => {
        try {
            await generateSummary(fileId, sessionId, setSummary, setKeyData, token_type, token);
            await getInsights(sessionId);
        } catch (error: any) {
            throw new Error('An error occurred.');
        } 
    };
    

    const getInsights = async (sessionId: string) => {
        try {
            await generateInsights(sessionId, setInsights, token_type, token);
        } catch (error) {
            throw new Error('An error occurred.');
        }
    }
    
    
    const deleteFile = () => {
        setFileName('');
        setSelectedFile(null);
        setFileId(''); 
    };


    return (
        <div className={`flex items-center justify-center w-[20rem] flex-col md:w-[40rem] pb-20 md:pb-0 pt-10 md:pt-0`}>
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[10rem] border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gradient-to-r to-gray-400 from-gray-300 dark:hover:bg-bray-800 dark:bg-gradient-to-r dark:to-gray-700 dark:from-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">DOCX, PDF or TXT</p>
                </div>
                <input id="dropzone-file" type="file" accept=".docx,.pdf,.txt" className="hidden" onChange={handleFileChange} />
            </label>
            {fileName && (
                <>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <button onClick={deleteFile} className="mr-2 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="20px" height="20px">
                                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/>
                            </svg>
                        </button>
                        {`Uploaded file: ${fileName}`}
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <button onClick={createSessionAndUploadFile} disabled={loading} className={`px-4 py-2 rounded w-24 h-10 ${loading ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-800' : 'bg-blue-500 text-white'}`}>
                        {loading ? (
                                <div role="status" className="flex items-center justify-center">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : 'Upload'}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
export default UploadFile;
