package com.nofee.consumers.services.kafka.brevo;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.nofee.consumers.services.httpRequest.Request;

@Service
public class KafkaBrevoConsumer {
    @Value("${kafka.groupId}")
    final String groupId = "${kafka.groupId}";
    @Value("${brevo.edge.function}")
    final String brevoEdgeFunction = "${brevo.edge.function}";
    @KafkaListener(topics = "notification.brevo", groupId = groupId)
    public void consume(String messsage) throws JSONException {
        JSONObject jsonObject = new JSONObject(messsage);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        JSONObject provider = jsonObject.getJSONObject("provider").getJSONObject("credentials");
        headers.put("api-key", provider.getString("apiKey"));
        JSONObject to = jsonObject.getJSONObject("payload").getJSONObject("to");
        String subject = jsonObject.getJSONObject("payload").getString("subject");
        String htmlContent = jsonObject.getJSONObject("payload").getString("htmlContent");

        JSONObject payload = new JSONObject();
        Request request = new Request(brevoEdgeFunction, "POST", null, jsonObject);
        
    }
}
