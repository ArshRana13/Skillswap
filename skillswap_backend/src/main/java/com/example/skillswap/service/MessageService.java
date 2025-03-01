package com.example.skillswap.service;

import com.example.skillswap.model.Message;
import com.example.skillswap.model.MessageDTO;
import com.example.skillswap.model.User;
import com.example.skillswap.repository.MessageRepository;
import com.example.skillswap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;



    public List<Message> getChat(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id).orElseThrow(() -> new RuntimeException("User not found"));
        User user2 = userRepository.findById(user2Id).orElseThrow(() -> new RuntimeException("User not found"));

        return messageRepository.findMessagesBetweenUsers(user1, user2);
    }

    public List<User> searchUsers(@RequestParam Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found"));

        List<User> users=  messageRepository.findUsersWhoInteractedWith(user);

//        List<User> users = new ArrayList<>();
//        msgs.forEach(m -> {
//
//            if(!users.contains(m))
//            users.add(m.getReceiver());
//            if(!users.contains(m))
//                users.add(m.getSender());
//
//        });
        return users;
    }

    public Message sendMessage(MessageDTO messageDTO) {
        Optional<User> senderOpt = userRepository.findById(messageDTO.getSender_id());
        Optional<User> receiverOpt = userRepository.findById(messageDTO.getReceiver_id());

        if (senderOpt.isEmpty() || receiverOpt.isEmpty()) {
            return null;  // If either user is not found, return false
        }

        Message message = new Message();
        message.setSender(senderOpt.get());
        message.setReceiver(receiverOpt.get());
        message.setContent(messageDTO.getContent());
        message.setTime(messageDTO.getTime() != null ? messageDTO.getTime() : LocalDateTime.now());

        messageRepository.save(message);
        return message;
    }
}
