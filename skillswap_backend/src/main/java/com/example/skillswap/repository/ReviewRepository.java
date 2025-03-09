package com.example.skillswap.repository;

import com.example.skillswap.model.Review;
import com.example.skillswap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByReceiver(User receiver);  // Use User instead of Long
}
