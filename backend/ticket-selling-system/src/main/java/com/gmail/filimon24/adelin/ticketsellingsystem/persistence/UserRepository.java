package com.gmail.filimon24.adelin.ticketsellingsystem.persistence;

import com.gmail.filimon24.adelin.ticketsellingsystem.model.Role;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.role = ?1")
    List<User> findUsersByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.userName = ?1")
    User findByUsername(String userName);
}
