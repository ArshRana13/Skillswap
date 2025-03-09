package com.example.skillswap.service;

import com.example.skillswap.model.Review;
import com.example.skillswap.model.User;
import com.example.skillswap.repository.ReviewRepository;
import com.example.skillswap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository; // Ensure this repository exists

    public List<Review> getReviewsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reviewRepository.findByReceiver(user);
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review) ;
    }
}

