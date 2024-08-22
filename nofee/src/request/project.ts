import axios from 'axios';
import Cookies from 'universal-cookie';
import { generateApiEndpoint, headers } from './api';
import { NotoficationProvider } from '@/interface/Project';

export async function createProject(payload: { name: string; description: string }) {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/project`,
            {
                name: payload.name,
                description: payload.description,
            },
            {
                headers
            }
        );

        return response.data || null;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return null;
    }
}


export async function getAllProjects() {
    try {
        console.log(generateApiEndpoint('/project'))
        const response = await axios.get(generateApiEndpoint('/project'), {
            headers
        });
        console.log(response.data)

        // Process the response data
        const projects = response.data;
        return projects;
    }
    catch (error: any) {
        console.log(error.message)
        throw error
    }
}


export async function addProvider(provider: NotoficationProvider) {

    try {
        const response = await axios.post(generateApiEndpoint('/project/provider'), provider, {
            headers
        });
        console.log(response.data)
        return response.data;
    }
    catch (error: any) {
        console.log(error.message)
        throw error;
    }
}