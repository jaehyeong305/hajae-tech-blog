package com.hajaetechblog.htbbackend.service;

import com.hajaetechblog.htbbackend.model.User;
import com.hajaetechblog.htbbackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HtbUserDetailService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(HtbUserDetailService.class);


    private final UserRepository userRepository;

    @Autowired
    public HtbUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with userName: " + username);
        }
        return new User(user.getUsername(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
    }
}