import AuthToken from "../interfaces/AuthToken";
import cryptoJs from 'crypto-js';
export function createAccessToken(user: AuthToken) {
    const payload = {
        userId: user?.id,
        email: user.email,
    }
    return cryptoJs.AES.encrypt(JSON.stringify(payload), process.env.JWT_SECRET!).toString();

}