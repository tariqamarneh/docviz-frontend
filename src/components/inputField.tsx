import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
    htmlFor: string;
    text: string;
    isPending: boolean;
    type: string;
    placeholder: string;
    validator: UseFormRegisterReturn;
    error?: string;
}

const Input: React.FC<InputProps> = ({ htmlFor, text, isPending, type, placeholder, validator, error }) => {
    const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
    const validClasses = "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white";
    const errorClasses = "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:text-red-400";

    return (
        <div className="mb-4">
            <label htmlFor={htmlFor} className={`block text-sm font-medium ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {text}
            </label>
            <div className="mt-1">
                <input
                    id={htmlFor}
                    type={type}
                    autoComplete={type === 'password' ? 'current-password' : 'on'}
                    required
                    className={`${baseClasses} ${error ? errorClasses : validClasses}`}
                    placeholder={placeholder}
                    disabled={isPending}
                    {...validator}
                />
            </div>
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}

export default Input;
