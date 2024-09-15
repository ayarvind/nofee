import { kafkaTopics } from "../../kafka-topics";
import kafka from "../kafka";
export async function deleteTopics(topics: string) {
    const admin = kafka.admin();
    try {
        await admin.connect();
        await admin.deleteTopics({
            topics: [topics]
        })
    }
    catch (error) {
        console.error('Error deleting topic:', error);
    }
}