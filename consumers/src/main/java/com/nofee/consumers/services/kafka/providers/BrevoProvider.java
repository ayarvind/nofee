package com.nofee.consumers.services.kafka.providers;

import com.nofee.consumers.services.ApiRequest;
import com.nofee.consumers.services.NotificationProvider;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("brevo")
public class BrevoProvider implements NotificationProvider {

    @Value("${brevo.edge.function}")
    private String brevoEdgeFunction;

    @Override
    public String sendNotification(JSONObject payload, String apiKey) throws Exception {
        ApiRequest apiRequest = new ApiRequest(brevoEdgeFunction, apiKey, payload);
        JSONObject response = apiRequest.post();
        if (!response.getString("status").equals("success")) {
            throw new Exception("Failed to send Brevo notification: " + response.toString());
        }
        
        return response.toString();
    }
}
