package com.nofee.consumers.dto.provider;
import lombok.Data;

@Data
public class Message{
    public String payload;
    public String topic;
    public String projectId;
    public String userId;
    public Provider provider;
}
