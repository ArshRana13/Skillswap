package com.example.skillswap.service;

import com.example.skillswap.model.Post;
import com.example.skillswap.model.User;

import java.util.List;
import java.util.Optional;

public interface PostService {
    List<Post> getUnacceptedPosts(Long userId);
    List<Post> getPostsByUser(Optional<User> user);


}

