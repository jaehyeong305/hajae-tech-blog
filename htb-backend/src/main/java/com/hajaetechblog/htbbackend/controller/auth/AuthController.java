package com.hajaetechblog.htbbackend.controller.auth;

import com.hajaetechblog.htbbackend.model.LoginRequest;
import com.hajaetechblog.htbbackend.model.User;
import com.hajaetechblog.htbbackend.repository.UserRepository;
import com.hajaetechblog.htbbackend.service.HtbUserDetailService;
import com.hajaetechblog.htbbackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final HtbUserDetailService userDetailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserRepository userRepository, HtbUserDetailService userDetailService, PasswordEncoder passwordEncoder,  JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.userDetailService = userDetailService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            String username = loginRequest.getUsername();
            String password = loginRequest.getPassword();

            // NOTE(hajae): 사용자 메일을 기반으로 사용자 정보를 가져옴
            UserDetails userDetails = userDetailService.loadUserByUsername(username);

            // NOTE(hajae): 입력된 비밀번호를 해시화하여 UserDetails 객체의 비밀번호와 비교
            if (new BCryptPasswordEncoder().matches(password, userDetails.getPassword())) {
                // NOTE(hajae): JWT Token 생성 후 반환
                String token = this.jwtUtil.generateToken(username);
                return ResponseEntity.ok(token);
            } else {
                // 로그인 실패
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
