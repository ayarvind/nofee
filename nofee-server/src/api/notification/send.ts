import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { scheduleNotification } from '../../bull';
import { NotificationPayload } from '../../interfaces/NotificationPayload';
import { createNotificationPayload } from '../../utilities/createNotificationPayload';

// Helper function for returning error responses
const sendErrorResponse = (response: Response, statusCode: number, message: string) => {
    return response.status(statusCode).json({ message });
};

export async function send(request: Request, response: Response) {
    const user = request.body.user?.payload;
    const { payload, provider, projectId } = request.body;

    // Input validations
    if (!provider) return sendErrorResponse(response, 400, "Provider is not provided");
    if (!user) return sendErrorResponse(response, 400, "User not found");
    if (!projectId) return sendErrorResponse(response, 400, "ProjectId not found");
    if (!payload) return sendErrorResponse(response, 400, "Payload not found");

    try {
        // Check if project exists
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                ownerId: user.id,
            },
        });

        if (!project) {
            return sendErrorResponse(response, 404, `Project with ID ${projectId} not found`);
        }

        // Find provider data
        const formattedProviderName = provider.charAt(0).toUpperCase() + provider.slice(1);
        const providerData = await prisma.provider.findFirst({
            where: {
                projectId: projectId,
                name: formattedProviderName,
            },
        });

        if (!providerData) {
            return sendErrorResponse(response, 404, `Provider ${formattedProviderName} not found for project ${projectId}`);
        }

        // Create a notification entry
        const notification = await prisma.notification.create({
            data: {
                status: 'scheduled',
                project: {
                    connect: { id: projectId },
                },
                payload: JSON.stringify(payload),
            },
        });

        // Construct the notification payload
        const notificationPayload: NotificationPayload = {
            payload: createNotificationPayload(payload, user, notification, providerData),
            topic: `notification.${provider}`,
            projectId,
            userId: user.id,
            provider: {
                name: providerData.name,
                type: providerData.type,
                credentials: providerData.credentials,
            },
        };

        // Schedule notification using Kafka
        try {
            scheduleNotification(notificationPayload);
        } catch (error: any) {
            console.error('Error scheduling notification:', error); // Log specific errors
            return sendErrorResponse(response, 500, `Failed to schedule notification: ${error.message}`);
        }

        // Return success response
        return response.status(200).json({ message: "Notification scheduled successfully" });

    } catch (error: any) {
        console.error('Error in send function:', error); // Improved error logging with function context
        return sendErrorResponse(response, 500, "An error occurred while scheduling the notification.");
    }
}
