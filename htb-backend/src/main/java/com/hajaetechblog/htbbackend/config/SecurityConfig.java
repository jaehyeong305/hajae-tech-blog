package com.hajaetechblog.htbbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // NOTE(hajae): Bean이란 Spring IoC 컨테이너가 관리하는 자바 객체
    // Spring 측에 객체 관리를 맡김
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // NOTE(hajae): 웹 요청에 대한 권한 부여를 설정
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                new AntPathRequestMatcher("/**")).permitAll()
                )
                // NOTE(hajae): csrf란 공격자가 희생자의 권한을 도용하여 특정 웹 사이트의 기능을 실행
                // 회원가입과 같은 엔드포인트는 사용자가 로그인하기 전에도 사용할 수 있어야 하므로 CSRF 검증을 무시
                .csrf(csrf -> csrf.ignoringRequestMatchers("/api/auth/signup"))
                .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                .cors(Customizer.withDefaults())
                // NOTE(hajae): 로그인 페이지에 대한 모든 요청을 인증되지 않은 상태에서도 허용
                .formLogin(formLogin -> formLogin
                        .loginPage("/login")
                        .permitAll()
                )
                .rememberMe(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}