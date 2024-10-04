package com.nofee.consumers.services.kafka;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

import com.nofee.consumers.config.Producer;
import com.nofee.consumers.services.NotifyProducers;
import com.nofee.consumers.services.kafka.providers.NotificationProviderFactory;

@Service
public class KafkaConsumerService {

    private final NotificationProviderFactory providerFactory;
    private final Producer producer;

    @Autowired
    public KafkaConsumerService(NotificationProviderFactory providerFactory, Producer producer) {
        this.providerFactory = providerFactory;
        this.producer = producer;
    }

    private void handleNotification(String message) throws JSONException {
        NotifyProducers notifyProducers = new NotifyProducers(producer);
        notifyProducers.prepareMessage(message);
        try {
            notifyProducers.notifyProducer();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void processMessage(String providerName, String message, Acknowledgment acknowledgment)
            throws JSONException {
        try {
            JSONObject jsonObject = new JSONObject(message);
            String apiKey = jsonObject.getJSONObject("provider")
                    .getJSONObject("credentials")
                    .getString("apiKey");
            JSONObject payload = jsonObject.getJSONObject("payload");

            var provider = providerFactory.getProvider(providerName);
            String response = provider.sendNotification(payload, apiKey);
            acknowledgment.acknowledge(); 
            handleNotification(response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }





    @KafkaListener(topics = "${kafka.brevo.topic}", groupId = "${kafka.brevo.groupId}", containerFactory = "kafkaListenerContainerFactory")
    public void consumeBrevo(String message, Acknowledgment acknowledgment) throws JSONException {
        System.out.println(message);
        processMessage("brevo", message, acknowledgment);
    }

    @KafkaListener(topics = "${kafka.slack.topic}", groupId = "${kafka.slack.groupId}", containerFactory = "kafkaListenerContainerFactory")
    public void consumeSlack(String message, Acknowledgment acknowledgment) throws JSONException {
        // System.out.println(message);
        processMessage("slack", message, acknowledgment);
    }

   
    // Add more Kafka listeners for other providers (WhatsApp, etc.)
}
