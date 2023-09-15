package com.hajaetechblog.htbbackend.controller.auth;

import com.hajaetechblog.htbbackend.security.JwtUtils;
import com.hajaetechblog.htbbackend.model.User;
import com.hajaetechblog.htbbackend.repository.UserRepository;
import com.hajaetechblog.htbbackend.service.HtbUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(UserRepository userRepository, HtbUserDetailService htbUserDetailService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.htbUserDetailService = htbUserDetailService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        try {
            // NOTE(hajae): 사용자 메일을 기반으로 사용자 정보를 가져옴
            UserDetails userDetails = htbUserDetailService.loadUserByUsername(user.getEmail());

            // NOTE(hajae): 입력된 비밀번호를 해시화하여 UserDetails 객체의 비밀번호와 비교
            if (new BCryptPasswordEncoder().matches(user.getPassword(), userDetails.getPassword())) {
                // NOTE(hajae): 토큰을 기반으로 JWT 토큰 생성
                String token = jwtUtils.generateToken(userDetails);

                Map<String, String> response = new HashMap<>();

                // NOTE(hajae): JWT 토큰을 반환
                response.put("token", token);

                // NOTE(hajae): 유저 정보 반환
                response.put("email", userDetails.getUsername());

                return response;
            } else {
                // 로그인 실패
                throw new UsernameNotFoundException("Invalid username or password");
            }
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found with username: " + user.getFullName());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        // 비밀번호 해싱
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        // 사용자 생성
        userRepository.save(user);

        // 회원가입 성공 메시지 반환
        return ResponseEntity.ok("User registered successfully");
    }
}
