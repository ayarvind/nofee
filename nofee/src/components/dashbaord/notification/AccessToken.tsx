import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function AccessTokenModal() {
    const [showToken, setShowToken] = useState<boolean>(false);
    const token = useSelector((state: any) => state.openProject.accessToken);

    const handleCopyToken = () => {
        navigator.clipboard.writeText(token);
        toast.success('Access token copied to clipboard!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Access Token</h2>
                    <button
                        onClick={() => window.history.back()}
                        className="text-white text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    <label htmlFor="accessToken" className="block text-sm font-medium mb-2">
                        Access Token
                    </label>
                    <input
                        type={showToken ? 'text' : 'password'}
                        id="accessToken"
                        value={token}
                        readOnly
                        className="w-full p-3 bg-gray-800 text-white rounded-md pr-12"
                    />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        onClick={() => setShowToken(!showToken)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 mr-1"
                    >
                        {showToken ? <FaEyeSlash /> : <FaEye />} 
                        {showToken ? 'Hide' : 'Show'} Token
                    </button>
                    <button
                        type="button"
                        onClick={handleCopyToken}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                        <FaCopy /> Copy Token
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccessTokenModal;
