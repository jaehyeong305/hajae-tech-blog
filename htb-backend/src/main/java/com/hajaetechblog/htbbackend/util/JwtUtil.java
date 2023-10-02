package com.hajaetechblog.htbbackend.util;

import com.hajaetechblog.htbbackend.model.RefreshToken;
import com.hajaetechblog.htbbackend.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtUtil {

    Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private final RefreshTokenRepository refreshTokenRepository;

    private final String jwtSecretKey;
    private final long accessExpirationTime;
    private final long refreshExpirationTime;
    private SecretKey secretKey;

    @Autowired
    public JwtUtil(
            @Value("${security.jwt.token.secret-key}") String jwtSecretKey,
            @Value("${security.jwt.token.access-expire-length}") long accessExpirationTime,
            @Value("${security.jwt.token.refresh-expire-length}") long refreshExpirationTime,
            RefreshTokenRepository refreshTokenRepository
    ) {
        this.jwtSecretKey = jwtSecretKey;
        this.accessExpirationTime = accessExpirationTime;
        this.refreshExpirationTime = refreshExpirationTime;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @PostConstruct
    public void init() {
        //NOTE(hajae): 보안을 위해 랜덤한 바이트 배열 사용
        this.secretKey = Keys.hmacShaKeyFor(this.jwtSecretKey.getBytes());
    }

    public String generateToken(String username, String type) {
        Date now = new Date();
        //NOTE(hajae): 토큰 만료 시간
        Date expirationTime = this.createExpirationTime(now, type);

        //NOTE(hajae): JWT 토큰 생성
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expirationTime)
                .signWith(this.secretKey, SignatureAlgorithm.HS256)
                .compact();

        return token;
    }

    // NOTE(hajae): 토큰 검증
    public Boolean authenticateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(this.secretKey).build().parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return false;
        }
    }

    // NOTE(hajae): Refresh Token 검증
    public Boolean authenticateRefreshToken(String token) {
        if (!this.authenticateToken(token)) return false;

        RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(token);

        if (refreshToken != null) {
            return token.equals(refreshToken.getRefreshToken());
        }

        return false;
    }

    //NOTE(hajae): 토큰 만료 시간 생성
    private Date createExpirationTime(Date now, String type) {
        return switch (type) {
            case "Access" -> new Date(now.getTime() + this.accessExpirationTime);
            case "Refresh" -> new Date(now.getTime() + this.refreshExpirationTime);
            default -> throw new IllegalArgumentException("Invalid type: " + type);
        };
    }

    public Date getExpirationTimeFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        return claims.getExpiration();
    }

    // NOTE(hajae): Access token header 설정
    public void setHeaderAccessToken(HttpServletResponse response, String accessToken) {
        response.setHeader("Access_Token", accessToken);
    }

    // NOTE(hajae): Refresh token header 설정
    public void setHeaderRefreshToken(HttpServletResponse response, String refreshToken) {
        response.setHeader("Refresh_Token", refreshToken);
    }
}
