import kafka,{KafkaTopics} from '../kafka';

export async function createTopics(topics: KafkaTopics[]) {
    const admin = kafka.admin();
    try {
        await admin.connect();
        // Create topic
        await admin.createTopics({
            topics: topics
        });
    } catch (error) {
        console.error('Error creating topic:', error);
    } finally {
        await admin.disconnect();
    }
}
