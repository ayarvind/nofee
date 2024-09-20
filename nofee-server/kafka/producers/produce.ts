import kafka from "../kafka";

export async function produce(payload: any) {
    const topicName = payload?.topic;
    const producer = kafka.producer();
    try {
        await producer.connect();
        await producer.send({
            topic: topicName,
            messages: [
                { value: JSON.stringify(payload) }
            ]
        });
    } catch (error) {
        throw error;
    } finally {
        await producer.disconnect();
    }

}