package com.hajaetechblog.htbbackend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class AuthFailureHandlerConfig implements AuthenticationFailureHandler {
    Logger logger = LoggerFactory.getLogger(AuthFailureHandlerConfig.class);

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) {
        if (exception.getClass().isAssignableFrom(UsernameNotFoundException.class)) {
            logger.error("BAD_CREDENTIAL");
        } else if (exception.getClass().isAssignableFrom(DisabledException.class)) {
            logger.error("USER_DISABLED");
        } else {
            logger.error("Exception Class Name : " + exception.getClass());
        }
    }
}