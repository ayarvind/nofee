import { listTopics } from "./kafka/admin/listTopics";
(async () => {
    const topics = await listTopics();
    console.log(topics);  
})()