package com.gmail.filimon24.adelin.ticketsellingsystem.business.service;

import com.gmail.filimon24.adelin.ticketsellingsystem.business.exception.UserNotFoundException;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.Role;
import com.gmail.filimon24.adelin.ticketsellingsystem.model.User;
import com.gmail.filimon24.adelin.ticketsellingsystem.persistence.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User addCashier(User user) {
        if (user.getId() != null)
            throw new IllegalArgumentException("Expected user ID null");

        if (user.getRole() != Role.CASHIER)
            throw new IllegalArgumentException("Expected a cashier user");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateCashier(Long id, User user) {

        User dbUser = getCashierById(id);
        String userName, password, firstName, lastName, email;

        userName = user.getUserName();
        if (userName != null) dbUser.setUserName(userName);

        password = user.getPassword();
        if (password != null) dbUser.setPassword(passwordEncoder.encode(password));

        firstName = user.getFirstName();
        if (firstName != null) dbUser.setFirstName(firstName);

        lastName = user.getLastName();
        if (lastName != null) dbUser.setLastName(lastName);

        email = user.getEmail();
        if (email != null) dbUser.setEmail(email);

        return userRepository.save(dbUser);
    }

    public List<User> getAllCashiers() {
        return userRepository.findUsersByRole(Role.CASHIER);
    }

    public User getCashierById(Long id) {
        User user =  userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        if (user.getRole() != Role.CASHIER)
            throw new UserNotFoundException(id);
        return user;
    }

    public void deleteCashierById(Long id) {
        User user = getCashierById(id);
        userRepository.delete(user);
    }
}
