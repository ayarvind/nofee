import { Account, OAuthProvider } from 'appwrite';
import { client } from '../appwrite';
import GoogleIcon from '../icons/google.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Home from './dashbaord/home';
import Cookies from 'universal-cookie';
import Loader from '@/layout/Loader';
function Login() {
    const [Loading, setLoading] = useState(false)
    const [token, setToken] = useState<string>()
    const dispatch = useDispatch();
    const cookies = new Cookies()
    useEffect(() => {
        const account = new Account(client);
        const token_ = cookies.get('token')
        setToken(token_)
        if (token_) return;
        const getUser = async () => {
            setLoading(true)
            try {
                const user_ = await account.get();
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                    name: user_.name,
                    email: user_.email,
                    phone: user_.phone,
                });

                if (response) {
                    cookies.set('token', response.data.token)
                    setToken(response.data.token)
                    console.log(response.data.token)
                }
            } catch (error: unknown) {
                console.error('Error in login:', error);
            } finally {
                setLoading(false)
            }
        };

        getUser();
    }, [dispatch]);

    const handleLogin = async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session(
                OAuthProvider.Google,
                import.meta.env.VITE_PUBLIC_REDIRECT_URL as string
            );
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };


    return (
        <div>
            {
                Loading ? (
                    <>
                        <div className="flex items-center justify-center min-h-screen">
                            <div className='text-white text-2xl'>
                                <Loader/>
                            </div>
                        </div>
                    </>
                ) : (<>
                    {!token ? (
                    <div className="flex justify-center">
                            <div className=" w-full mt-20 max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
                            <h1 className="text-4xl font-bold text-white">Login</h1>
                            <p className="text-sm text-gray-400">
                                Login to continue and streamline the notification process effectively.
                            </p>
                            <button
                                onClick={handleLogin}
                                className="w-full p-3 text-white flex justify-center items-center gap-5 bg-blue-800 rounded-sm hover:bg-blue-900"
                            >
                                <img src={GoogleIcon} width={20} height={20} alt="google" />
                                Login with Google
                            </button>
                        </div>
                    </div>
                    ) : (
                        <Home />
                    )}

                </>)
            }
        </div>
    );
}

export default Login;
