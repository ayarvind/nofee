import {Kafka} from 'kafkajs';

export interface KafkaTopics{
    topic:string,
    numPartitions:number,
    replicationFactor:number

}



const kafka = new Kafka({
    clientId: 'nofee-server',
    brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
});
export default kafka;