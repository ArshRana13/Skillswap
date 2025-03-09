package com.example.skillswap.repository;

import com.example.skillswap.model.Post;
import com.example.skillswap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;


public interface PostRepository extends JpaRepository<Post, Long> {

    // Find all unaccepted posts where the post creator is NOT the given user
    List<Post> findByAcceptedFalseAndUserNot(User user);

    List<Post> findByUser(Optional<User> user);
}


