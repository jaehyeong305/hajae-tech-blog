package com.hajaetechblog.htbbackend.controller.auth;

import com.hajaetechblog.htbbackend.model.*;
import com.hajaetechblog.htbbackend.repository.RefreshTokenRepository;
import com.hajaetechblog.htbbackend.repository.UserRepository;
import com.hajaetechblog.htbbackend.service.HtbUserDetailService;
import com.hajaetechblog.htbbackend.service.UserService;
import com.hajaetechblog.htbbackend.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final HtbUserDetailService userDetailService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, HtbUserDetailService userDetailService, JwtUtil jwtUtil, RefreshTokenRepository refreshTokenRepository) {
        this.userService = userService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userDetailService = userDetailService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            String username = loginRequest.getUsername();
            String password = loginRequest.getPassword();

            // NOTE(hajae): 사용자 이름을 기반으로 사용자 정보를 가져옴
            User userDetails = userDetailService.loadUserByUsername(username);

            // NOTE(hajae): 입력된 비밀번호를 해시화하여 UserDetails 객체의 비밀번호와 비교
            if (new BCryptPasswordEncoder().matches(password, userDetails.getPassword())) {
                // NOTE(hajae): JWT Token 생성
                String accessToken = jwtUtil.generateToken(username, "Access");
                String refreshToken = jwtUtil.generateToken(username, "Refresh");

                Optional<RefreshToken> refreshTokenOptional = Optional.ofNullable(refreshTokenRepository.findByUsername(username));

                if (refreshTokenOptional.isPresent()) {
                    RefreshToken existingToken = refreshTokenOptional.get();
                    existingToken.setRefreshToken(refreshToken);
                    refreshTokenRepository.save(existingToken);
                } else {
                    RefreshToken newRefreshToken = new RefreshToken();
                    newRefreshToken.setUsername(username);
                    newRefreshToken.setRefreshToken(refreshToken);
                    newRefreshToken.setExpiresIn(jwtUtil.getExpirationTimeFromToken(refreshToken));
                    refreshTokenRepository.save(newRefreshToken);
                }

                TokenResponse token = new TokenResponse(accessToken, refreshToken);

                jwtUtil.setAccessTokenInHeader(response, token.getAccessToken());
                jwtUtil.setRefreshTokenInHeader(response, token.getRefreshToken());

                UserResponse userInfo = new UserResponse(userDetails.getUsername(), userDetails.getEmail());
                return ResponseEntity.ok(userInfo);
            } else {
                throw new UsernameNotFoundException("Invalid username or password");
            }
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found with username");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        try {
            // NOTE(hajae): 사용자 생성
            userService.createUser(user);

            // NOTE(hajae): 성공 메시지 반환
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception ex) {
            // TODO(hajae): Error Handling
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user: " + ex.getMessage());
        }
    }
}
