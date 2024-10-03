// Email Notification Payload
export interface EmailNotificationPayload {
    subject: string;
    htmlContent: string;
    to: Array<{
        name: string;
        email: string;
    }>;
    sender: {
        name: string;
        email: string;
    };
}

// Slack Notification Payload
export interface SlackNotificationPayload {
    text: string;
    channel: string;
}

// Common Payload Data (notificationID, schedule, etc.)
export interface PayloadData {
    notificationID: string;
    schedule?: Date;
    priority?: number;
}

// Union type for email or slack payload
export type NotificationPayloadData = (EmailNotificationPayload | SlackNotificationPayload) & PayloadData;

// Main Notification Payload Interface
export interface NotificationPayload {
    topic: string;
    payload: NotificationPayloadData;
    projectId: string;
    userId: string;
    provider: {
        name: string;
        type: string;
        credentials: any;
    };
}
