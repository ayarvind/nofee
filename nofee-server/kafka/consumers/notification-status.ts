import updateNotificationStatus from "../../src/utilities/update-notification-status";
import kafka from "../kafka";

// Initialize the Kafka consumer
const consumer = kafka.consumer({
    groupId: 'notification-status',
});

const run = async () => {
    try {
        // Connect to Kafka
        await consumer.connect();

        // Subscribe to the 'notification-status' topic
        await consumer.subscribe({ topic: 'notification-status', fromBeginning: true });

        // Start consuming messages
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    // Safely parse the message key and value
                    const key = message.key ?  message.key.toString() : null;
                    const value = message.value ? JSON.parse(message.value.toString()) : null;
                    const payload = {
                        ...value,
                        key
                        
                    }
                    // Update the notification status and commit the offset if successful
                    const notification = await updateNotificationStatus(payload);
                    if (notification) {
                        await consumer.commitOffsets([{ topic, partition, offset: (parseInt(message.offset, 10) + 1).toString() }]);
                    }
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            },
        });
    } catch (error) {
        console.error("Error setting up consumer:", error);
    }
};

export default run;
