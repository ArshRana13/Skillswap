package com.example.skillswap.controller;

import com.example.skillswap.model.Post;
import com.example.skillswap.model.User;
import com.example.skillswap.repository.PostRepository;
import com.example.skillswap.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // Constructor-based dependency injection
    public PostController(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/post")
    public ResponseEntity<Boolean> post(@RequestBody Post post) {
        try {
            // Check if the user exists
            Optional<User> user = userRepository.findById(post.getUser().getId());
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
            }

            // Set the user before saving
            post.setUser(user.get());

            // Save the post in the database
            postRepository.save(post);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
}
