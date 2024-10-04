package com.nofee.consumers.services.kafka.providers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nofee.consumers.services.NotificationProvider;

import java.util.Map;

@Component
public class NotificationProviderFactory {

    private final Map<String, NotificationProvider> providers;

    @Autowired
    public NotificationProviderFactory(Map<String, NotificationProvider> providers) {
        this.providers = providers;
    }

    public NotificationProvider getProvider(String providerName) {
        return providers.get(providerName);
    }
}
