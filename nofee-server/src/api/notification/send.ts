import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { produce as kafkaProduce } from '../../../kafka/producers/produce';

export async function send(request: Request, response: Response) {
    const user = request.body.user?.payload;
    const { payload, provider, projectId } = request.body;

    // Input validations
    if (!provider) {
        return response.status(400).json({ message: "Provider is not provided" });
    }
    if (!user) {
        return response.status(400).json({ message: "User not found" });
    }
    if (!projectId) {
        return response.status(400).json({ message: "ProjectId not found" });
    }
    if (!payload) {
        return response.status(400).json({ message: "Payload not found" });
    }

    try {
        // Check if project exists
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                ownerId: user.id,
            },
        });

        if (!project) {
            return response.status(400).json({
                message: "Project not found",
                projectId: projectId,
            });
        }

        // Find provider data
        const providerData = await prisma.provider.findFirst({
            where: {
                projectId: projectId,
                name: provider.charAt(0).toUpperCase() + provider.slice(1),
            },
        });

        if (!providerData) {
            return response.status(400).json({
                message: "Provider not found",
            });
        }

        // Create a notification entry
        const notification = await prisma.notification.create({
            data: {
                // projectId,
                status: 'scheduled',
                project: {
                    connect: {
                        id: projectId,
                    },
                },
                payload: JSON.stringify(payload),
            },
        });

        // Construct the notification payload
        const notificationPayload = {
            payload: {
                ...payload,
                sender: {
                    name: user.name,
                    email: user.email,
                },
                // apiKey: providerData.credentials.apiKey
            },
            topic: `notification.${provider}`,
            projectId,
            userId: user.id,
            provider: {
                name: providerData.name,
                type: providerData.type,
                credentials: providerData.credentials,
            },
            notificationID: notification.id
        };

        // Produce Kafka message
        await kafkaProduce(notificationPayload);
        if (!payload.schedule) {
            const notification_status = notification.status;
            if (notification_status == 'sent') {
                return response.status(200).json({ message: "Notification sent successfully" });
            }
        }

        // Return success response
        return response.status(200).json({ message: "Notification scheduled successfully" });

    } catch (error: any) {
        console.error('Error in send function:', error); // Improved error logging
        return response.status(500).json({ message: "An error occurred while scheduling the notification." });
    }
}
