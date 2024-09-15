import AuthToken, { AccessToken } from "../interfaces/AuthToken";
import cryptoJs from 'crypto-js';
export function createAccessToken(user: AccessToken) {
    const payload = {
        userId: user?.id,
        email: user.email,
    }
    return cryptoJs.AES.encrypt(JSON.stringify(payload), process.env.JWT_SECRET!).toString();


}
export function decodeAccessToken(token: string){
    const bytes = cryptoJs.AES.decrypt(token, process.env.JWT_SECRET!);
    const payload = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    return payload;
}