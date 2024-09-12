import React, { useState, useEffect } from 'react';
import { ProviderType } from './ProviderList';
import { useSelector } from 'react-redux';
import { addProvider } from '@/request/project';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { validatePayload } from '@/utils/validate';

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
    const [testPayload, setTestPayload] = useState<string>(''); // To store test payload
    const [response, setResponse] = useState<string>(''); // To store response from the server
    const project = useSelector((state: any) => state.openProject);
    const [emailLoading, setEmailLoading] = useState(false);

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
                credentials: { apiKey },
            };

            await addProvider(providerData);
            toast.success('Credentials saved successfully.');
            setOpenAddProvider(false);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
        toast.success('API Key copied to clipboard!');
    };

    const handleTestEmail = async () => {
        setEmailLoading(true);
        const token = new Cookies().get('token');
        if (!token) {
            setEmailLoading(false);
            return toast.error('Please login first');
        }

        const user = jwtDecode(token).payload;
        const payload = JSON.parse(testPayload);

        if (validatePayload(payload)) {
            setEmailLoading(false);
            return toast.error(validatePayload(payload));
        }

        try {
            const response = await axios.post(
                "https://snmvywyrufnzlgiqoqys.supabase.co/functions/v1/brevo",
                {
                    ...payload,
                    sender: {
                        name: project?.name,
                        email: user?.email,
                    },
                },
                {
                    headers: {
                        'api-key': apiKey,
                    },
                }
            );

            if (response.data.status === 'success') {
                toast.success('Email sent successfully');
                setResponse(response.data?.data);
            } else {
                toast.error('Error sending email');
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error('Error sending email');
            toast.error(err.message);
        } finally {
            setEmailLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-slate-900 rounded-lg shadow-lg p-6 w-[80%] mx-auto h-[80vh]">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4 text-white">
                        <img src={provider.icon} alt="icon" className="w-6 h-6 rounded-full" />
                        <span className="text-xl font-semibold">{provider.name}</span>
                    </div>
                    <button
                        onClick={() => setOpenAddProvider(false)}
                        className="text-white hover:bg-slate-800 p-2 rounded-full"
                    >
                        <IoMdClose size={28} />
                    </button>
                </div>

                {/* API Key Section */}
                <div className="mb-6">
                    <label htmlFor="apiKey" className="text-white text-sm mb-2 block">
                        Please provide {provider.name} credentials
                    </label>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <input
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                type={showApiKey ? 'text' : 'password'}
                                id="apiKey"
                                className="w-full bg-slate-800 text-white p-3 rounded-lg pr-16 outline-none"
                                placeholder="Enter API Key"
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute inset-y-0 right-12 flex items-center text-white px-2"
                            >
                                {showApiKey ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <button
                                type="button"
                                onClick={handleCopyApiKey}
                                className="absolute inset-y-0 right-2 flex items-center text-white px-2"
                            >
                                <FaCopy />
                            </button>
                        </div>
                        <button
                            onClick={handleSave}
                            className={`px-4 py-2 bg-blue-800 text-white rounded-lg transition duration-150 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>

                {/* Test Email Section */}
                {
                    !response && (<>
                        <h1 className="text-white font-bold mb-2">Send a test email</h1>
                        <div className="mb-4">
                            <label htmlFor="payload" className="text-white text-sm mb-1 block">
                                Enter the payload
                            </label>
                            <textarea
                                className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
                                placeholder='{"to": {"email": "", "name": ""}, "subject": "Test email", "htmlContent": "This is a test email"}'
                                value={testPayload}
                                onChange={(e) => setTestPayload(e.target.value)}
                                rows={6}
                            />
                        </div>
                        <button
                            disabled={!apiKey || !testPayload || emailLoading}
                            onClick={handleTestEmail}
                            className={`px-4 py-2 bg-blue-800 text-white rounded-lg transition duration-150 ease-in-out ${emailLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {emailLoading ? 'Sending...' : 'Send Test Email'}
                        </button>
                    </>)
                }

                {response && (
                    <div className="mt-4 p-4 bg-slate-950 rounded-lg h-80 overflow-y-auto">
                        <h1 className="text-white font-bold mb-2">Response</h1>
                        <pre className="text-white text-sm">{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddProvider;
