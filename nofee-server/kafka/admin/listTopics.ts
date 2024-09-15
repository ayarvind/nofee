import kafka from "../kafka";

export async function listTopics(): Promise<any> {
    const admin = kafka.admin();
    try {
        await admin.connect();
        const topics = await admin.listTopics();
        return topics;
    } catch (error) {
        console.error('Error listing topics:', error);
    } finally {
        await admin.disconnect();
    }
}