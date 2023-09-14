package com.hajaetechblog.htbbackend.repository;

import com.hajaetechblog.htbbackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByFullName(String username); // 사용자 이름으로 사용자 찾기
}
