package com.nofee.consumers.services;

import java.io.IOException;

import org.json.JSONObject;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ApiRequest {
    private OkHttpClient client;
    private JSONObject payload;
    private String apiKey;
    private String url;

    // Media type for JSON payload
    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    public ApiRequest(String url, String apiKey, JSONObject payload) {
        this.client = new OkHttpClient();
        this.url = url;
        this.apiKey = apiKey;
        this.payload = payload;
    }

    public JSONObject post() {
        RequestBody body = RequestBody.create(payload.toString(), JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("api-key", apiKey)
                .addHeader("Content-Type", "application/json")
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Request failed: " + response.body().string());
                JSONObject errorResponse = new JSONObject();
                try {
                    errorResponse.put("error", "Request failed: " + response.body().string());
                } catch (org.json.JSONException jsonException) {
                    jsonException.printStackTrace();
                }
            }
            String responseData = response.body().string();
            try {
                return new JSONObject(responseData);
            } catch (org.json.JSONException jsonException) {
                jsonException.printStackTrace();
                JSONObject errorResponse = new JSONObject();
                try {
                    errorResponse.put("error", "JSON parsing failed: " + jsonException.getMessage());
                } catch (org.json.JSONException e) {
                    e.printStackTrace();
                }
                return errorResponse;
            }

        } catch (IOException e) {
            JSONObject errorResponse = new JSONObject();
            try {
                errorResponse.put("error", "Request failed: " + e.getMessage());
            } catch (org.json.JSONException jsonException) {
                jsonException.printStackTrace();
            }
            return errorResponse;
        }
    }
}
