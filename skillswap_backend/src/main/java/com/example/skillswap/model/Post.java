package com.example.skillswap.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "u_id", nullable = false)
    private User user;  // Reference to users table (foreign key)

    @Column(nullable = false)
    private String requirement;

    @Column(nullable = false)
    private String offer;

    @Column
    private Boolean accepted = false;

    @ManyToOne
    @JoinColumn(name = "accepted_uid")
    private User acceptedUser;  // Nullable field for accepted user

    @Column
    private String description;
}
