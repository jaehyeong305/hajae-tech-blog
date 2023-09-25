package com.hajaetechblog.htbbackend.service;

import com.hajaetechblog.htbbackend.model.User;
import com.hajaetechblog.htbbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class HtbUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public HtbUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByName(userName);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with userName: " + userName);
        }
        return new User(user.getUsername(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
    }
}
