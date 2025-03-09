package com.example.skillswap.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Optional;

@Data
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "given_by", nullable = false)
    private User giver;

    @ManyToOne
    @JoinColumn(name = "given_to", nullable = false)
    private User receiver;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;


    public void setReceiver(Optional<User> userById) {
        this.receiver = userById.orElse(null);
    }
    public void setGiver(Optional<User> userById) {
        this.giver = userById.orElse(null);
    }
}
