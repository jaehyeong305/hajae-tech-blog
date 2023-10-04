package com.hajaetechblog.htbbackend.repository;

import com.hajaetechblog.htbbackend.model.User;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface UserRepository extends CrudRepository<User, String> {
    User findByUsername(String username);
}
