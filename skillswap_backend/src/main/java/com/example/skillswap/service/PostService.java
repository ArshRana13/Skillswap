package com.example.skillswap.service;

import com.example.skillswap.model.Post;

import java.util.List;

public interface PostService {
    List<Post> getUnacceptedPosts(Long userId);
}

