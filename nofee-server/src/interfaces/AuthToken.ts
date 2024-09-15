export default interface AuthToken {
    name : string;
    email : string;
    phone ?: string;
    image ?: string;
    id?: string;
}

export  interface AccessToken extends AuthToken {
    projectId: string;
    // expires?: number;
}