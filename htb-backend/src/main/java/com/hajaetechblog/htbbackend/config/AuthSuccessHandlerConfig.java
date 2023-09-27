package com.hajaetechblog.htbbackend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;

@Configuration
public class AuthSuccessHandlerConfig extends SimpleUrlAuthenticationSuccessHandler {
    Logger logger = LoggerFactory.getLogger(AuthSuccessHandlerConfig.class);
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        try {
            String username = authentication.getName();
            logger.info("User " + username + " has logged in successfully.");
            // NOTE(hajae): 인증이 성공한 후에는 root로 이동
            response.sendRedirect("/");
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
    }
}