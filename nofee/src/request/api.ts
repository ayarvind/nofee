import Cookies from "universal-cookie"

const cookies = new Cookies() 
export const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': cookies.get('token') || '',
}
export const baseUrl = import.meta.env.VITE_API_BASE_URL
export function generateApiEndpoint(endpoint:string) : string{
    return `${baseUrl}${endpoint}`;
}