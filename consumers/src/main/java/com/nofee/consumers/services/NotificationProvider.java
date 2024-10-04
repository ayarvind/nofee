package com.nofee.consumers.services;

import org.json.JSONObject;

public interface NotificationProvider {
    String sendNotification(JSONObject payload, String apiKey) throws Exception;
}
