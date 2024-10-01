import { prisma } from "../prisma";

export default async function notify(data: any) {
    const status = data.status == 'success' ? 'sent' : 'failed';
    try {
        const notification = await prisma.notification.update({
            where: {
                id: data.notificationId,
            },
            data: {
                status
            },
        });
        console.log(`Notification ${notification.id} ${status}`);
    } catch (error) {
        console.log(error);
    }
}