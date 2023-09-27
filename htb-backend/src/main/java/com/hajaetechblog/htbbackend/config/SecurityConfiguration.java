package com.hajaetechblog.htbbackend.config;

import com.hajaetechblog.htbbackend.service.HtbUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@Import(CorsConfig.class)
public class SecurityConfiguration {

    @Autowired
    private HtbUserDetailService userDetailsService;

    @Bean
    public CorsConfigurationSource securityCorsConfigurationSource() {
        return new CorsConfig().corsConfigurationSource();
    }

    @Bean
    public AuthSuccessHandlerConfig authSuccessHandler() {
        return new AuthSuccessHandlerConfig();
    }

    @Bean
    public AuthFailureHandlerConfig authFailureHandler() {
        return new AuthFailureHandlerConfig();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    @Primary
    public AuthenticationManagerBuilder configureAuthenticationManagerBuilder(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder;
    }

    // NOTE(hajae): Bean이란 Spring IoC 컨테이너가 관리하는 자바 객체
    // Spring 측에 객체 관리를 맡김
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // NOTE(hajae): 웹 요청에 대한 권한 부여를 설정
                .authorizeHttpRequests(authorize -> {
                    // NOTE(hajae): 개발단계이기때문에 모든 URL에 대한 권한 설정을 켜준다.
                    authorize.requestMatchers(new AntPathRequestMatcher("/api/auth/login")).permitAll();
                    authorize.requestMatchers(new AntPathRequestMatcher("/api/auth/signup")).permitAll();
                    authorize.requestMatchers("/**").authenticated();

                    // TODO(hajae): 인가 설정
                    // authorize.requestMatchers("/user/**").authenticated();
                    // authorize.requestMatchers("/manager/**").hasAnyRole("ADMIN", "MANAGER");
                    // authorize.requestMatchers("/admin/**").hasRole("ADMIN");
                    // authorize.anyRequest().permitAll();
                })
                // NOTE(hajae): csrf란 공격자가 희생자의 권한을 도용하여 특정 웹 사이트의 기능을 실행
                // 회원가입과 같은 엔드포인트는 사용자가 로그인하기 전에도 사용할 수 있어야 하므로 CSRF 검증을 무시
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(securityCorsConfigurationSource()));

        return http.build();
    }
}