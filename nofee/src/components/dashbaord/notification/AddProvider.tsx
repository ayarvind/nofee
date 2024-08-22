import React, { useState, useEffect } from 'react';
import { ProviderType } from './ProviderList';
import { useSelector } from 'react-redux';
import { addProvider } from '@/request/project';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';

function AddProvider({
    provider,
    setOpenAddProvider,
}: {
    provider: ProviderType;
    setOpenAddProvider: React.Dispatch<React.SetStateAction<boolean | ProviderType>>;
}) {
    if (!provider) return null;

    const [apiKey, setApiKey] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [showApiKey, setShowApiKey] = useState<boolean>(false);
    const project = useSelector((state: any) => state.openProject);

    // Find existing credentials for the provider
    useEffect(() => {
        if (project && project.Provider) {
            const existingCredentials = project.Provider.find(
                (cred: any) => cred.name === provider.name && cred.type === provider.type
            );
            if (existingCredentials) {
                setApiKey(existingCredentials.credentials.apiKey);
            }
        }
    }, [project, provider]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const providerData = {
                name: provider.name,
                projectId: project.id,
                type: provider.type,
                credentials: {
                    apiKey,
                },
            };

            await addProvider(providerData);

            toast.success('Credentials saved successfully.');
            setOpenAddProvider(false);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
        toast.success('API Key copied to clipboard!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <div className="bg-slate-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
                <div className="mb-4 flex text-white gap-2">
                    <img src={provider.icon} alt="icon" className="w-6 h-6 rounded-full" />
                    <span>{provider.name}</span>
                </div>
                <div className="mb-4">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="apiKey" className="text-white text-sm mb-1">
                            Please provide {provider.name} credentials
                        </label>
                        <div className="relative">
                            <input
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                type={showApiKey ? 'text' : 'password'}
                                id="apiKey"
                                className="w-full outline-none bg-slate-800 text-white p-3 rounded-lg pr-14"
                                placeholder="Enter API Key"
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute inset-y-0 right-10 flex items-center text-white bg-slate-800 rounded-r-md px-2"
                            >
                                {showApiKey ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <button
                                type="button"
                                onClick={handleCopyApiKey}
                                className="absolute inset-y-0 right-2 flex items-center text-white bg-slate-800 rounded-r-md px-2"
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 bg-blue-800 text-white rounded-md mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={() => setOpenAddProvider(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProvider;
