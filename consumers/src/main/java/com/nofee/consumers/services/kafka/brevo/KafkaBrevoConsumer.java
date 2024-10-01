package com.nofee.consumers.services.kafka.brevo;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

import com.nofee.consumers.config.Producer;
import com.nofee.consumers.services.ApiRequest;
import com.nofee.consumers.services.NotifyProducers;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class KafkaBrevoConsumer {

    @Value("${kafka.groupId}")
    private String groupId;

    @Value("${brevo.edge.function}")
    private String brevoEdgeFunction;
    private final Producer producer;

    @Autowired
    public KafkaBrevoConsumer(Producer producer) {
        this.producer = producer;
    }

    private void handleNotification(String message) throws JSONException {
        // Use the injected Producer bean
        NotifyProducers notifyProducers = new NotifyProducers(producer);
        notifyProducers.prepareMessage(message);
        try {
            notifyProducers.notifyProducer(); // Ensure this is calling notifyProducer correctly
        } catch (Exception e) {
            e.printStackTrace();
            // Optionally handle the failure of sending notification
        }
    }

    @KafkaListener(topics = "notification.brevo", groupId = "${kafka.groupId}", containerFactory = "kafkaListenerContainerFactory")
    public void consume(String message, Acknowledgment acknowledgment) throws JSONException {
        JSONObject jsonObject = new JSONObject(message);
        String apiKey = jsonObject.getJSONObject("provider")
                .getJSONObject("credentials")
                .getString("apiKey");
        JSONObject payload = jsonObject.getJSONObject("payload");

        // Make API request
        ApiRequest apiRequest = new ApiRequest(brevoEdgeFunction, apiKey, payload);
        JSONObject response = apiRequest.post();

        // Check the response status
        if (response.getString("status").equals("success")) {
            // Acknowledge the message if notification is sent successfully
            acknowledgment.acknowledge();
            System.out.println("Message acknowledged: " + message);

            // Call handleNotification only after successful acknowledgment
            handleNotification(message);
        } else {
            System.out.println("Failed to send notification: " + response.toString());
            // Do not acknowledge the message on failure
        }
    }
}
