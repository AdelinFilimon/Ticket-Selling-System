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

    public void insertDemoAdmin() {
        if (userRepository.findByUsername("admin") == null) {
            User admin = new User();
            admin.setUserName("admin");
            admin.setFirstName("Adelin");
            admin.setLastName("Filimon");
            admin.setEmail("demoEmail@yahoo.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole(Role.ADMINISTRATOR);
            userRepository.save(admin);
        }
    }

    public void insertDemoCashier() {
        if (userRepository.findByUsername("cashier") == null) {
            User cashier = new User();
            cashier.setUserName("cashier");
            cashier.setFirstName("Adelin");
            cashier.setLastName("Filimon");
            cashier.setEmail("demoEmail@yahoo.com");
            cashier.setPassword(passwordEncoder.encode("cashier"));
            cashier.setRole(Role.CASHIER);
            userRepository.save(cashier);
        }
    }

    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new UserNotFoundException(username);
        return user;
    }

    public boolean checkPassword(String password, User user) {
        return passwordEncoder.matches(password, user.getPassword());
    }


}
