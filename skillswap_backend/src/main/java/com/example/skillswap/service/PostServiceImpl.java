package com.example.skillswap.service;

import com.example.skillswap.model.Post;
import com.example.skillswap.repository.PostRepository;
import com.example.skillswap.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.example.skillswap.model.User;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Post> getUnacceptedPosts(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found")); // Handle case where user doesn't exist
        return postRepository.findByAcceptedFalseAndUserNot(user);
    }

    public List<Post> getPostsByUser(Optional<User> user) {
        return postRepository.findByUser(user);
    }
}
