import { Notification, Provider, User } from "@prisma/client";
import { NotificationPayloadData, EmailNotificationPayload, SlackNotificationPayload, PayloadData } from "../interfaces/NotificationPayload";

export function createNotificationPayload(payload: any, user: User, notification: Notification, provider: Provider): NotificationPayloadData {
    let notificationPayload: NotificationPayloadData;

    if (provider.type === "email") {
        // Handle email notification payload
        notificationPayload = {
            subject: payload.subject,
            htmlContent: payload.message,
            to: payload.to, 
            schedule:payload?.schedule,
            priority : payload?.priority,
            sender: {
                name: user.name,
                email: user.email,
            },
            notificationID: notification.id,
           
        } as EmailNotificationPayload & PayloadData; 

    } else if (provider.name === "Slack") {
        // Handle slack notification payload
        notificationPayload = {
            text: payload.text,
            channel: payload.channel,
            schedule:payload?.schedule,
            priority:payload?.priority,
            notificationID: notification.id,
            
        } as SlackNotificationPayload & PayloadData; 
    } else {
        throw new Error(`Unsupported provider : ${provider.name}`);
    }

    return notificationPayload;
}






