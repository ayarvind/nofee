package com.nofee.consumers.services;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nofee.consumers.config.Producer;

@Service
public class NotifyProducers {

    private final KafkaProducer<String, String> producer;
    private final String topic = "notification-status";
    private JSONObject message;
    private JSONObject payload = new JSONObject();

    // Constructor injection to get the KafkaProducer bean
    @Autowired
    public NotifyProducers(Producer producerBean) throws JSONException {
        this.producer = producerBean.getProducer();
    }

    public void prepareMessage(String messageString) throws JSONException {
        // Prepare the payload
        System.out.println(messageString);
        this.message = new JSONObject(messageString);
        String notificationID = this.message
                .getJSONObject("data")
                .getJSONObject("config")
                .getJSONObject("data")
                .getString("notificationID");
        payload.put("notificationID", notificationID);
        String status = this.message.getString("status").equals("success") ? "sent" : "failed";
        payload.put("status", status);
        System.out.println(payload);
    }

    public void notifyProducer() throws JSONException {
        // Create ProducerRecord with key as notificationID and value as payload
        String notificationID = payload.getString("notificationID");
        ProducerRecord<String, String> record = new ProducerRecord<>(topic, notificationID, payload.toString());

        producer.send(record, (metadata, exception) -> {
            if (exception == null) {
                System.out.println("Message sent successfully to Kafka topic: " + metadata.topic());
            } else {
                exception.printStackTrace();
            }
        });
    }
}
