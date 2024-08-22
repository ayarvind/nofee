import { Client } from 'appwrite';

export const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PUBLIC_APPWRITE_PROJECT);
