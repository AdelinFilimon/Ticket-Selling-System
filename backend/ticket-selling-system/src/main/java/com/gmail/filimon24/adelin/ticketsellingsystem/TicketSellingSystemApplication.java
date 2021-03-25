package com.gmail.filimon24.adelin.ticketsellingsystem;

import com.gmail.filimon24.adelin.ticketsellingsystem.business.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TicketSellingSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(TicketSellingSystemApplication.class, args);
    }

    @Autowired
    private UserService userService;

    @Bean
    public CommandLineRunner insertDemoAdmin() {
        return args -> {
            userService.insertDemoAdmin();
            userService.insertDemoCashier();
        };
    }
}
