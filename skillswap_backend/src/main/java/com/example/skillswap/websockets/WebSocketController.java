package com.example.skillswap.websockets;

import com.example.skillswap.model.MessageDTO;
import com.example.skillswap.model.Message;
import com.example.skillswap.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService; // Autowire MessageService

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(
            Map<String, Object> message, // Accept JSON as a Map
            @Header("receiverId") Long receiverId // Extracting receiverId from headers
    ) {
        // Extract fields from the message
        String content = (String) message.get("content");
        Long senderId = Long.valueOf((Integer) message.get("sender_id")); // Cast to Integer first, then to Long
        String timeString = (String) message.get("time");

        // Parse the time string to LocalDateTime
        LocalDateTime time = LocalDateTime.parse(timeString, DateTimeFormatter.ISO_DATE_TIME);

        // Create a MessageDTO object
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setContent(content);
        messageDTO.setReceiver_id(receiverId);
        messageDTO.setSender_id(senderId);
        messageDTO.setTime(time);

        // Save the message using MessageService
        Message msg = messageService.sendMessage(messageDTO);

        // Broadcast the message to the receiver's topic
        messagingTemplate.convertAndSend("/topic/" + receiverId, msg);
        messagingTemplate.convertAndSend("/topic/" + senderId, msg);
    }
}