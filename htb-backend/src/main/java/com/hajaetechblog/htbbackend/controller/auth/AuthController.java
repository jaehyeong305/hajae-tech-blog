package com.hajaetechblog.htbbackend.controller.auth;

import com.hajaetechblog.htbbackend.model.User;
import com.hajaetechblog.htbbackend.repository.UserRepository;
import com.hajaetechblog.htbbackend.service.HtbUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final HtbUserDetailService htbUserDetailService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository, HtbUserDetailService htbUserDetailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.htbUserDetailService = htbUserDetailService;
        this.passwordEncoder = passwordEncoder;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        try {
            // NOTE(hajae): 사용자 메일을 기반으로 사용자 정보를 가져옴
            User userDetails = htbUserDetailService.loadUserByUsername(user.getUsername());

            // NOTE(hajae): 입력된 비밀번호를 해시화하여 UserDetails 객체의 비밀번호와 비교
            if (new BCryptPasswordEncoder().matches(user.getPassword(), userDetails.getPassword())) {
                // NOTE(hajae): 토큰을 기반으로 JWT 토큰 생성
                Map<String, String> response = new HashMap<>();
                response.put("name", userDetails.getUsername());
                response.put("email", userDetails.getEmail());

                return response;
            } else {
                // 로그인 실패
                throw new UsernameNotFoundException("Invalid username or password");
            }
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found with username: " + user.getName());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        try {
            // NOTE(hajae): 비밀번호 해싱
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);

            // NOTE(hajae): 사용자 생성
            userRepository.save(user);

            // NOTE(hajae): 성공 메시지 반환
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception ex) {
            // TODO(hajae): Error Handling
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user: " + ex.getMessage());
        }
    }
}
