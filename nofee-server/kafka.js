const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['10.18.5.164:9092'],
})

const init = async () => {
    const admin = kafka.admin();

    await admin.connect();
    await admin.createTopics({
        topics:[
            {
                topic: 'my-topic',
                numPartitions: 2,
                replicationFactor: 1,
            }
        ]
    })
    console.log("Admin connected");
    const topic =  await admin.listTopics();
    console.log(topic);
    admin.disconnect()
}
init()