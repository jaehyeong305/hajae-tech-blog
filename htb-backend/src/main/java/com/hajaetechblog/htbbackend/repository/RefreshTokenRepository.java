package com.hajaetechblog.htbbackend.repository;

import com.hajaetechblog.htbbackend.model.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    RefreshToken findByUsername(String userID);
    RefreshToken findByRefreshToken(String refreshToken);
    void deleteByUsername(String userId);
    
}