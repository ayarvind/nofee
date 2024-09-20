package com.nofee.consumers.services.httpRequest;

import java.util.Map;

import org.json.JSONObject;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Request implements HttpRequest{
    final OkHttpClient client = new OkHttpClient();
    private String url;
    private String method;
    private Map<String, String> headers;
    private JSONObject body;
    public static final MediaType JSON = MediaType.get("application/json");
    Response response;
    Request(String url, String method, Map<String, String> headers, JSONObject body){
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
    }
    @Override
    public void request(){
        RequestBody requestBody = RequestBody.create(body.toString(), JSON);
        okhttp3.Request request = new okhttp3.Request.Builder()
            .url(url)
            .method(method, requestBody)
            .build();
        try {
           Response response =  client.newCall(request).execute();
           this.response = response;
          
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Response getResponse(){
        return response;
    }
}
