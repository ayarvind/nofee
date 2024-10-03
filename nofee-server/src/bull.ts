import Bull from 'bull'
import dotenv from 'dotenv';
dotenv.config();
import { produce as kafkaProduce } from '../kafka/producers/produce';

console.log({
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
})

export const scheduledQueue = new Bull('scheduled-notification', {

    redis: {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!),
    },
});




export function scheduleNotification(message: any) {
    const scheduledTime = message.payload?.schedule || new Date();
    const delay = scheduledTime - Date.now();
    if (delay < 0) {
        return console.error("Invalid schedule time");
    }
    try {
        scheduledQueue.add(
            { message },
            {
                delay,
            }
        );
    } catch (error) {
        console.error(error);
    }
}



export function processNotification() {
    scheduledQueue.process(async (job) => {
        const message = job.data.message;
        await kafkaProduce(message);
    });
}





