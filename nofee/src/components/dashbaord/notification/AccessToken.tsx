import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import {useSelector} from 'react-redux'
function AccessTokenModal() {
    const [showToken, setShowToken] = useState<boolean>(false);
    const cookies = new Cookies();
    const token = cookies.get('token');
    const projectId = useSelector((state: any) => state.openProject.id);
    const handleCopyToken = (text:string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
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
                <div className="mb-4">
                    <label htmlFor="accessToken" className="block text-sm font-medium mb-2">
                        Project Id
                    </label>
                    <input
                        id="accessToken"
                        value={projectId}
                        readOnly
                        className="w-full p-3 bg-gray-800 text-white rounded-md pr-12"
                    />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        onClick={()=> handleCopyToken(projectId)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                        <FaCopy /> Copy Id
                    </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        onClick={()=> handleCopyToken(token)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                        <FaCopy /> Copy access token
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccessTokenModal;
