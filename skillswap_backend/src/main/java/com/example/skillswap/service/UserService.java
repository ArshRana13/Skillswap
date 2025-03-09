package com.example.skillswap.service;

import com.example.skillswap.model.User;
import com.example.skillswap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;




    public User authenticateUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            System.out.println("User exists");
            User user = userOptional.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    public User registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            System.out.println("User exists");
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists");
        }

        // Ensure the password is not already encoded
        if (!user.getPassword().startsWith("$2a$")) { // BCrypt hashes start with "$2a$"
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long currentUserId) {
        return userRepository.findById(currentUserId);
    }
}
