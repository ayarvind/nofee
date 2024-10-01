import kafka from "../kafka";

const consumer = kafka.consumer({
    groupId:'notification-status'
})

const run = async ()=>{
    await consumer.connect();
    await consumer.subscribe({topic:'notification-status',fromBeginning:true});
    await consumer.run({
        eachMessage:async ({topic,partition,message})=>{
            console.log(message);
        }
    })
    
}
export default run

