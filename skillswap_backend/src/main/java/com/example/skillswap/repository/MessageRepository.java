package com.example.skillswap.repository;

import com.example.skillswap.model.Message;
import com.example.skillswap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderOrReceiver(User sender, User receiver);
//    List<Message> findBySenderOrReceiver(User user);

    // Fetch messages exchanged between two users, regardless of sender/receiver order
    List<Message> findBySenderAndReceiverOrReceiverAndSender(User sender1, User receiver1, User sender2, User receiver2);

    List<Message> findDistinctBySenderOrReceiver(User sender, User receiver);

    @Query("SELECT m FROM Message m WHERE (m.sender = :user1 AND m.receiver = :user2) OR (m.sender = :user2 AND m.receiver = :user1)")
    List<Message> findMessagesBetweenUsers(@Param("user1") User user1, @Param("user2") User user2);

    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.receiver = :user " +
            "UNION " +
            "SELECT DISTINCT m.receiver FROM Message m WHERE m.sender = :user")
    List<User> findUsersWhoInteractedWith(@Param("user") User user);

}
