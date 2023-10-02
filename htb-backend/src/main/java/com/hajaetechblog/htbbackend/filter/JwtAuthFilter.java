package com.hajaetechblog.htbbackend.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hajaetechblog.htbbackend.model.GlobalResponse;
import com.hajaetechblog.htbbackend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    // NOTE(hajae): HTTP 요청이 오면 WAS(tomcat)가 HttpServletRequest, HttpServletResponse 객체 생성
    // request시 diFilterInternal이 한번 실행된다.
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // NOTE(hajae): 헤더에서 각각의 토큰을 가져옴
        String accessToken = jwtUtil.getAccessTokenFromHeader(request);
        String refreshToken = jwtUtil.getRefreshTokenFromHeader(request);

        if (accessToken != null) {
            // NOTE(hajae): Access Token값이 유효하다면 setAuthentication를 통해 security context에 인증 정보 저장
            if (jwtUtil.authenticateToken(accessToken)) {
                setAuthentication(jwtUtil.getUsernameFromToken(accessToken));
            }
            // NOTE(hajae): Access Token이 만료된 상황 && Refresh Token 존재하는 상황
            else if (refreshToken != null) {
                // NOTE(hajae): Refresh Token 검증 && Refresh Token DB에서 존재유무 확인
                boolean isRefreshToken = jwtUtil.authenticateRefreshToken(refreshToken);

                if (isRefreshToken) {
                    String loginId = jwtUtil.getUsernameFromToken(refreshToken);
                    String newAccessToken = jwtUtil.generateToken(loginId, "Access");
                    jwtUtil.setAccessTokenInHeader(response, newAccessToken);
                    // NOTE(hajae): Security context에 인증 정보 넣기
                    setAuthentication(jwtUtil.getUsernameFromToken(newAccessToken));
                }
                // NOTE(hajae): Refresh Token이 만료 || Refresh Token이 DB와 같지 않다면
                else {
                    jwtExceptionHandler(response, "RefreshToken Expired", HttpStatus.BAD_REQUEST);
                    return;
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    // NOTE(hajae): Security Context 에 Authentication 객체를 저장
    public void setAuthentication(String email) {
        Authentication authentication = jwtUtil.createAuthentication(email);
        // NOTE(hajae): security에서 생성되는 securityContextHolder에 authentication을 넣어줌
        // security가 securitycontextholder에서 인증 객체를 확인하는데 jwtAuthfilter에서 authentication을 넣어주면
        // UsernamePasswordAuthenticationFilter 내부에서 인증이 된 것을 확인하고 추가적인 작업을 진행 X
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    // NOTE(hajae): Jwt 예외처리
    public void jwtExceptionHandler(HttpServletResponse response, String msg, HttpStatus status) {
        response.setStatus(status.value());
        response.setContentType("application/json");
        try {
            String json = new ObjectMapper().writeValueAsString(new GlobalResponse(msg, status.value()));
            response.getWriter().write(json);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}