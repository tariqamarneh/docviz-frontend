"use client"
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCurrentUser } from "@/hooks/use-current-user";
import { createSession, generateSummary, saveFile, deleteSession, generateInsights } from '@/actions/apiService';

interface UploadFileProps {
    setFileId: (fileId: string) => void;
    setSummary: (summary: string) => void;
    setKeyData: (keyData: string) => void;
    setInsights: (insights: string) => void;
    setError: (error: string | null) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ 
    setFileId, 
    setSummary, 
    setKeyData, 
    setInsights, 
    setError 
}) => {
    const [fileName, setFileName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { token_type, token } = useCurrentUser();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFileName(acceptedFiles[0].name);
            handleUpload(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt']
        },
        multiple: false
    });

    const handleUpload = async (file: File) => {
        setLoading(true);
        setFileId('');
        setSummary('');
        setKeyData('');
        setInsights('');

        try {
            const sessionId = await createSession(token_type, token);
            await uploadFile(sessionId, file);
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    };

    const uploadFile = async (sessionId: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);

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

    return (
        <div className="w-full max-w-md mx-auto">
            <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
            >
                <input {...getInputProps()} />
                {loading ? (
                    <div className="flex flex-col items-center">
                        <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-blue-500 font-medium">Processing your file...</p>
                    </div>
                ) : (
                    <>
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            {isDragActive ? 'Drop the file here' : 'Drag and drop your file here'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">or click to select a file</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Supported formats: DOCX, PDF, TXT</p>
                    </>
                )}
            </div>
            {fileName && !loading && (
                <div className="mt-4 flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{fileName}</span>
                    <button 
                        onClick={() => setFileName('')} 
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

export default UploadFile;