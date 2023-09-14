package com.hajaetechblog.htbbackend.controller.auth;

import com.hajaetechblog.htbbackend.model.User;
import com.hajaetechblog.htbbackend.repository.UserRepository;
import com.hajaetechblog.htbbackend.service.HtbUserDetailService;
import com.hajaetechblog.htbbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

    @Autowired
    public AuthController(UserRepository userRepository, HtbUserDetailService htbUserDetailService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.htbUserDetailService = htbUserDetailService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        try {
            // 사용자 이름을 기반으로 사용자 정보를 가져옴
            UserDetails userDetails = htbUserDetailService.loadUserByUsername(user.getFullName());
            System.out.println("userDetails: " + userDetails);

            // 입력된 비밀번호를 해시화하여 UserDetails 객체의 비밀번호와 비교
            if (new BCryptPasswordEncoder().matches(user.getPassword(), userDetails.getPassword())) {
                // 로그인 성공
                // 토큰 생성
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
                Authentication authentication = authenticationManager.authenticate(authenticationToken);

                // 토큰을 기반으로 JWT 토큰 생성
                // 여기에서 JWT 토큰을 생성하고 반환하는 코드를 작성해야 합니다.

                // JWT 토큰을 반환
                Map<String, String> response = new HashMap<>();
                // JWT 토큰을 response에 설정
                response.put("token", "your_jwt_token_here");
                return response;
            } else {
                // 로그인 실패
                throw new UsernameNotFoundException("Invalid username or password");
            }
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found with username: " + user.getFullName());
        }
    }
    
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
