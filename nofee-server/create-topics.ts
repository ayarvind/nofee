import { createTopics } from './kafka/admin/createTopics';
import { kafkaTopics } from './kafka-topics';
import { listTopics } from './kafka/admin/listTopics';
import { deleteTopics } from './kafka/admin/deleteTopics';
(async () => {
    try {
        const topics = await listTopics();

        // Check if topics from kafkaTopics already exist
        for (const topic of kafkaTopics) {
            if (!topics.includes(topic.topic)) {
                await createTopics([topic]);
                console.log(`Topic ${topic.topic} created successfully`);
            }
        }

        // Delete topics that exist in `topics` but not in `kafkaTopics`
        for (const topic of topics) {
            if (!kafkaTopics.map(kafkaTopic => kafkaTopic.topic).includes(topic)) {
                await deleteTopics(topic);
                console.log(`Topic ${topic} deleted successfully`);
            }
        }
    } catch (error) {
        console.error('Error creating topics:', error);
    }finally{
        process.exit(0);
    }
})();
