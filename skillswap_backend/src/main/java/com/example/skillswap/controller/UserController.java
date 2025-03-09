package com.example.skillswap.controller;

import com.example.skillswap.model.Post;
import com.example.skillswap.model.Review;
import com.example.skillswap.model.User;
import com.example.skillswap.repository.PostRepository;
import com.example.skillswap.repository.UserRepository;
import com.example.skillswap.service.MessageService;
import com.example.skillswap.service.PostService;
import com.example.skillswap.service.ReviewService;
import com.example.skillswap.service.UserService;
import com.example.skillswap.security.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PostRepository postRepository;// ✅ Inject PostRepository here

    @Autowired
    private PostService postService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        System.out.println("User is " + user);
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/id/{user_id}")
    public ResponseEntity<User> getUserById(@PathVariable long user_id) {
        return userService.getUserById(user_id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/getReviews/{userId}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewsForUser(userId));
    }


    @PostMapping("/addReview")
    public Review addReview(@RequestBody Map<String, String> requestBody) {
        long giverId = Long.parseLong(requestBody.get("giver_id"));
        long ReceiverId = Long.parseLong(requestBody.get("receiver_id"));
        String content = requestBody.get("content");
        System.out.println("giver id " + giverId + " receiver id " + ReceiverId + " content " + content);
        Optional<User> receiver = userRepository.findById(ReceiverId);
        Optional<User> giver = userRepository.findById(giverId);
        Review review = new Review();
        review.setContent(content);
        review.setReceiver(userService.getUserById(ReceiverId));
        review.setGiver(userService.getUserById(giverId));

        return reviewService.addReview(review);
    }

    @PostMapping("/login")
    public ResponseEntity<List<String>> login(@RequestBody User user) {
        try {
            User authenticatedUser = userService.authenticateUser(user.getEmail(), user.getPassword());
            String token = jwtUtil.generateToken(authenticatedUser.getEmail());
            List<String> response = new ArrayList<>();
            response.add(token);
            String email = jwtUtil.extractEmail(token);
            Optional<User> userOptional = userService.getUserByEmail(email);
            response.add(userOptional.get().getId().toString());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        return userRepository.findById(id)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    user.setLocation(updatedUser.getLocation());
                    user.setProfileImageUrl(updatedUser.getProfileImageUrl());
                    user.setLinkedInUrl(updatedUser.getLinkedInUrl());
                    user.setGithubUrl(updatedUser.getGithubUrl());
                    User savedUser = userRepository.save(user);
                    return ResponseEntity.ok(savedUser);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }





    @PostMapping("/post")
    public ResponseEntity<Boolean> post(@RequestBody Post post, @RequestHeader("Authorization") String token) {
        try {
            // Extract email from JWT token
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));

            // Find the user by email
            Optional<User> userOptional = userService.getUserByEmail(email);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
            }

            User user = userOptional.get();
            post.setUser(user); // ✅ Associate the post with the authenticated user

            postRepository.save(post); // ✅ Save post to the database

            return ResponseEntity.ok(true);
        } catch (Exception e) {
            log.error("Error while saving post: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }



    @GetMapping("/posts/unaccepted")
    public ResponseEntity<List<Post>> getUnacceptedPosts(@RequestHeader("Authorization") String token) {

        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        System.out.println(email);

        // Find the user by email
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isEmpty()) {
            return null;
        }


        List<Post> posts = postService.getUnacceptedPosts(user.get().getId());

        return ResponseEntity.ok(posts);

    }


    @GetMapping("/posts/myPosts")
    public ResponseEntity<List<Post>> getMyPosts(@RequestHeader("Authorization") String token) {

        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        System.out.println(email);

        // Find the user by email
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isEmpty()) {
            return null;
        }


        List<Post> posts = postService.getPostsByUser(user);

        return ResponseEntity.ok(posts);

    }

    @GetMapping("/posts/delete/{id}")
    public boolean deletePost(@PathVariable Long id) {
            Post post = postService.getPostById(id);
            if(post != null) {
                postRepository.delete(post);
                return true;
            }
            return false;
    }



}
