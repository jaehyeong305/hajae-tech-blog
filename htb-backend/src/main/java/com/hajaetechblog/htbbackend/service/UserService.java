package com.hajaetechblog.htbbackend.service;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.hajaetechblog.htbbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final DynamoDBMapper dynamoDBMapper;
    
    @Autowired
    public UserService(PasswordEncoder passwordEncoder, DynamoDBMapper dynamoDBMapper) {
        this.passwordEncoder = passwordEncoder;
        this.dynamoDBMapper = dynamoDBMapper;
    }

    public User createUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        String uniqueID = UUID.randomUUID().toString();
        user.setPassword(encodedPassword);
        user.setId(uniqueID);

        dynamoDBMapper.save(user);

        return user;
    }
}