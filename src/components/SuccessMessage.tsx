import React from "react";

type MessageProps = {
    success: string | undefined;
};

const SuccessMessage: React.FC<MessageProps> = ({ success }) => {
    if (!success) return null;

    return (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-100">
            <p className="font-bold">Success</p>
            <p>{success}</p>
        </div>
    );
};

export default SuccessMessage;
