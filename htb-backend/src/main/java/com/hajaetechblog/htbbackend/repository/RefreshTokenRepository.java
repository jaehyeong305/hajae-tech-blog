package com.hajaetechblog.htbbackend.repository;

import com.hajaetechblog.htbbackend.model.RefreshToken;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    RefreshToken findByUsername(String userID);
    RefreshToken findByRefreshToken(String refreshToken);
    void deleteByUsername(String userId);
}