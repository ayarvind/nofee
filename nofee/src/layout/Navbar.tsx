import { client } from '@/appwrite';
import { Account } from 'appwrite';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const account = new Account(client);
    const [user, setUser] = useState<any>();
    const getUser = async () => {
        const user_ = await account.get();
        setUser(user_);
    };
    const logout = async () => {
        const cookies = new Cookies()
        cookies.remove('token')
        await account.deleteSession('current');
        window.location.href = '/login';
    }
    useEffect(() => {
        getUser();
    }, [user]);
    return (
        <>
            <div className='flex flex-row pl-6 pr-8 justify-between items-center p-4 w-ful bg-slate-950 mb-4' >
                <a href='/' className='text-white font-semibold text-xl p-1 w-28 text-center'>
                    Nofy
                </a>
                <div className='md:hidden'>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='text-white focus:outline-none'
                    >
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            ) : (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16m-7 6h7'
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <ul
                    className={`${isOpen ? 'block' : 'hidden'
                        } md:flex flex-row gap-4 md:items-center`}
                >

                    <li>
                        <a className='text-white font-semibold hover:bg-blue-950 pt-2 pr-4 pl-4 pb-2 rounded transition-all' href="/docs">Docs</a>
                    </li>

                    <li>
                        {
                            user ? (
                                <a className='text-white font-semibold hover:bg-blue-950 pt-2 pr-4 pl-4 pb-2 rounded transition-all' href="javascript:void(0)" onClick={logout}>Logout</a>
                            ) : (
                                <a className='text-white font-semibold hover:bg-blue-950 pt-2 pr-4 pl-4 pb-2 rounded transition-all' href="/login">Login</a>
                            )
                        }
                    </li>

                    <li>
                        <a className='text-white font-semibold hover:bg-blue-950 pt-2 pr-4 pl-4 pb-2 rounded transition-all' href="/docs">Register</a>
                    </li>

                    <li>
                        <Link
                            to='/project/new'
                            className='text-white gap-2 uppercase flex justify-between items-center bg-blue-800 pt-2 pb-2 pr-5 pl-5 rounded'
                        >
                            <>
                                <AiOutlinePlus size={20} className='inline-block' />
                                <span className='hidden md:inline-block'>New project</span>

                            </>
                        </Link>
                    </li>
                </ul>
            </div>

            {isOpen && (
                <ul className='md:hidden bg-gray-800'>
                    <li className='text-white font-semibold p-2'>
                        <a
                            href='/login'
                            className='text-white bg-blue-800 pt-2 pb-2 pr-5 pl-5 rounded block'
                        >
                            Login
                        </a>
                    </li>
                    <li className='text-white font-semibold p-2'>
                        <a
                            href='/register'
                            className='text-white bg-red-500 pt-2 pb-2 pr-5 pl-5 rounded block'
                        >
                            Register
                        </a>
                    </li>
                </ul>
            )}
        </>
    );
}

export default Navbar;
