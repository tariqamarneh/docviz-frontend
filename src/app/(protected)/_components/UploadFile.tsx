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
    setError: (error: string | null) => void;
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
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
            if (error.message === 'Please login first.') {
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
        } catch (error: any) {
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
        <div className="w-full max-w-md mx-auto">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.pdf,.txt" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                        DOCX, PDF or TXT.
                    </p>
                </div>
            </div>
            {fileName && (
                <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="truncate">{fileName}</span>
                        <button onClick={deleteFile} className="ml-2 flex-shrink-0 text-red-600 hover:text-red-500">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={createSessionAndUploadFile}
                        disabled={loading}
                        className={`mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                            loading
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            'Upload and Analyze'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

export default UploadFile;