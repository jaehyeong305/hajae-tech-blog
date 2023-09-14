package com.hajaetechblog.htbbackend.repository;

import com.hajaetechblog.htbbackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HtbUserDetailRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}