package com.hajaetechblog.htbbackend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // NOTE(hajae): 환경변수 사용
    @Value("${security.jwt.token.secret-key}") private String jwtSecretKey = System.getenv("JWT_SECRET_KEY");
    @Value("${security.jwt.token.expire-length}") private static long EXPIRATION_TIME;

    public String generateToken(String username) {
        Date now = new Date();
        //NOTE(hajae): 토큰 만료 시간
        Date expirationTime = new Date(now.getTime() + EXPIRATION_TIME);

        //NOTE(hajae): 보안을 위해 랜덤한 바이트 배열 사용
        SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes());

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
