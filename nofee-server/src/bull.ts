import Bull from 'bull';
import dotenv from 'dotenv';
dotenv.config();
import { produce as kafkaProduce } from '../kafka/producers/produce';
import { NotificationPayload } from './interfaces/NotificationPayload';

// Initialize the Bull Queue with proper error handling for environment variables
export const scheduledQueue = new Bull('scheduled-notification', {
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1', 
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379, 
    },
});

// Utility function to validate priority
function validatePriority(priority: number) {
    if (priority <= 0 || priority > 10) {
        throw new Error("Invalid priority value. Should be between 1 and 10.");
    }
}

// Utility function to validate time
function validateScheduledTime(scheduledTime: Date | undefined) {
    const currentTime = new Date().getTime();
    const delay = new Date(scheduledTime || currentTime).getTime() - currentTime;
    console.log(delay);
    if (delay < 0) {
        throw new Error("Invalid time format. Cannot schedule notifications in the past.");
    }
    return delay;
}

// Schedule Notification Function
export async function scheduleNotification(message: NotificationPayload) {
    const scheduledTime = message.payload?.schedule;  
    console.log(scheduledTime)
    const priority = message.payload?.priority || 1;

    // Validate priority and scheduled time
    validatePriority(priority);
    const delay = validateScheduledTime(scheduledTime);

    try {
        await scheduledQueue.add(
            { message },
            {
                delay, 
                priority, 
                removeOnComplete: true,
            }
        );
        console.log(`Job scheduled with priority: ${priority}, delay: ${delay} ms`);
    } catch (error) {
        console.error('Error scheduling notification:', error);
        throw new Error('Failed to schedule notification');
    }
}

// Process Notification Jobs
export function processNotification() {
    scheduledQueue.process(async (job) => {
        const message = job.data.message;
        try {
            // Produce message to Kafka
            await kafkaProduce(message);
        } catch (error) {
            console.error('Error processing notification:', error);
            // Consider adding retry logic here if needed
        }
    });
}
