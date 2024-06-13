import React from "react";

type SuccessMessageProps = {
    success: String | undefined;
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({ success }) => {
    if (!success) {
        return null;
    }

    return (
        <div className="mb-5 bg-green-200 p-3 flex rounded-md">
            <svg className="mr-2" fill="green" width="20px" height="20px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <title>success-standard-line</title>
                <path className="clr-i-outline clr-i-outline-path-1" d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"></path><path className="clr-i-outline clr-i-outline-path-2" d="M28,12.1a1,1,0,0,0-1.41,0L15.49,23.15l-6-6A1,1,0,0,0,8,18.53L15.49,26,28,13.52A1,1,0,0,0,28,12.1Z"></path>
                <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
            </svg>
            <label className="text-green-600">{success}</label>
        </div>
    )
};

export default SuccessMessage;
