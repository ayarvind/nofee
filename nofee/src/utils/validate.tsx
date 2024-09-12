interface EmailNotificationPayload {
    sender?: {
        name: string;
        email: string;
    }
    subject: string;
    htmlContent: string;
    to: string;

}
export function validatePayload(payload) {
    if (!payload.subject) {
        return 'Subject is required';
    }
    if (!payload.htmlContent) {
        return 'Html content is required';
    }
    if (!payload.to) {
        return 'To is required';
    }
    for (let key of payload.to) {
         const exp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        if (!exp.test(key?.email)) {
            return 'Invalid email address';
        }
    }
    return null;
}