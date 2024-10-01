import { prisma } from "../prisma"

export default async function updateNotificationStatus(payload: {
    key: string,
    notificationID: string,
    status: string

}) {
    try {
        const notification = await prisma.notification.update({
            where: {
                id: payload.notificationID
            },
            data: {
                status: payload.status
            }
        })
        console.log(`Notification status updated: ${notification.id} to ${notification.status}`)
        return notification;
    } catch (error) {
        console.log(error);
        return null;
    }
}