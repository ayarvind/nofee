package com.nofee.consumers;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationSocketListener {

    @GetMapping(value = "/notify")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("Notification Socket Listener is running");
    }
}
