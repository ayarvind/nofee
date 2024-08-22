import React from 'react';
import ProviderList from '@/components/dashbaord/notification/ProviderList';
import AccessToken from './dashbaord/notification/AccessToken';

export const routes: { [key: string]: JSX.Element } = {
    'providers': <ProviderList />,
    'access-token' : <AccessToken/>
}

function RequestHandler({ requestName }: { requestName: string }) {
    if (!requestName) (
        <>
        </>
    )
    if (!Object.keys(routes).includes(requestName)) {
        return (
                <div className="text-center w-1/3 m-auto text-white">
                    <h1 className="text-4xl font-bold">404 - Not Found</h1>
                    <p className="mt-4">The page you are looking for does not exist.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                        Go to Homepage
                    </button>
                </div>
        );
    } else {
        return (
            <div>
                {routes[requestName]}
            </div>
        );
    }
}

export default RequestHandler;
