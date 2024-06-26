import React from "react";

type MessageProps = {
    message: string | undefined;
};

const ErrorMessage: React.FC<MessageProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-100">
            <p className="font-bold">Error</p>
            <p>{message}</p>
        </div>
    );
};

const SuccessMessage: React.FC<MessageProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-100">
            <p className="font-bold">Success</p>
            <p>{message}</p>
        </div>
    );
};

export { ErrorMessage, SuccessMessage };