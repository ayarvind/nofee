package com.nofee.consumers.services.kafka.providers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.nofee.consumers.services.ApiRequest;
import com.nofee.consumers.services.NotificationProvider;

@Service("slack")
public class SlackProvider implements NotificationProvider {
    @Value("${slack.edge.function}")
    private String slackEdgeFunction;

    @Override
    public String sendNotification(JSONObject payload, String apiKey) throws Exception {
        ApiRequest apiRequest = new ApiRequest(slackEdgeFunction, apiKey, payload);
        JSONObject response = apiRequest.post();
        if (!response.getString("status").equals("success")) {
            throw new Exception("Failed to send Slack notification: " + response.toString());
        }
        return response.toString();
    }
}
