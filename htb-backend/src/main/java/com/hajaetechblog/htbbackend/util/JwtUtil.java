package com.hajaetechblog.htbbackend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // NOTE(hajae): 환경변수 사용
    private final String jwtSecretKey;
    private final long expirationTime;

    @Autowired
    public JwtUtil(
            @Value("${security.jwt.token.secret-key}") String jwtSecretKey,
            @Value("${security.jwt.token.expire-length}") long expirationTime
    ) {
        this.jwtSecretKey = jwtSecretKey;
        this.expirationTime = expirationTime;
    }

    public String generateToken(String username) {
        Date now = new Date();
        //NOTE(hajae): 토큰 만료 시간
        Date expirationTime = new Date(now.getTime() + this.expirationTime);

        //NOTE(hajae): 보안을 위해 랜덤한 바이트 배열 사용
        SecretKey secretKey = Keys.hmacShaKeyFor(this.jwtSecretKey.getBytes());

        //NOTE(hajae): JWT 토큰 생성
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expirationTime)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        return token;
    }
}
