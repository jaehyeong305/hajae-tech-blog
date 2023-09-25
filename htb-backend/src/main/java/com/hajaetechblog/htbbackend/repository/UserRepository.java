package com.hajaetechblog.htbbackend.repository;

import com.hajaetechblog.htbbackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByName(String name);
}
