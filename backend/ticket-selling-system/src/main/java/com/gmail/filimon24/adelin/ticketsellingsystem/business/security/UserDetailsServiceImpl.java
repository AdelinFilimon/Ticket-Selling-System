package com.gmail.filimon24.adelin.ticketsellingsystem.business.security;

import com.gmail.filimon24.adelin.ticketsellingsystem.model.User;
import com.gmail.filimon24.adelin.ticketsellingsystem.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);
        if (user == null) throw new UsernameNotFoundException("Could not find user " + s);
        return user;
    }
}
