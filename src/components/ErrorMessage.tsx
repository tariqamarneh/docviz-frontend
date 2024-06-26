import React from "react";


type MessageProps = {
    error: string | undefined;
};

const ErrorMessage: React.FC<MessageProps> = ({ error }) => {
    if (!error) return null;

    return (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-100">
            <p className="font-bold">Error</p>
            <p>{error}</p>
        </div>
    );
};

export default ErrorMessage;
