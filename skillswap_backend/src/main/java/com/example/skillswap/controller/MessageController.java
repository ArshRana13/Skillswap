package com.example.skillswap.controller;

import com.example.skillswap.model.Message;
import com.example.skillswap.model.MessageDTO;
import com.example.skillswap.model.User;
import com.example.skillswap.security.JwtUtil;
import com.example.skillswap.service.MessageService;
import com.example.skillswap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;




    @PostMapping("/chatProfiles")
    public ResponseEntity<List<User>> sendChatProfiles(
            @RequestBody Map<String, Long> requestBody,  // Accept JSON body
            @RequestHeader("Authorization") String token) {

        Long userId = requestBody.get("user_id");  // Extract user_id
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        Optional<User> userOptional = userService.getUserByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<User> userProfiles = messageService.searchUsers(userId);
        return ResponseEntity.ok(userProfiles);
    }

    @PostMapping("/getMessages")
    public ResponseEntity<List<Message>> sendChatMessages(
            @RequestBody Map<String, Long> requestBody,  // Accept JSON body
            @RequestHeader("Authorization") String token) {

        Long current_user_id = requestBody.get("current_user_id");
        Long selected_user_id = requestBody.get("selected_user_id");

        List<Message> chat = messageService.getChat(current_user_id, selected_user_id);
        return ResponseEntity.ok(chat);
    }

    @GetMapping("/chat")
    public List<Message> getChat(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        return messageService.getChat(user1Id, user2Id);
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageDTO messageDTO,
                                               @RequestHeader("Authorization") String token) {
        System.out.println("Sender id is "+messageDTO.getSender_id() + " and Receiver id is "+messageDTO.getReceiver_id());
        Message message = messageService.sendMessage(messageDTO);
        if(message != null)
        return ResponseEntity.ok(message);
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
