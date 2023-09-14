package com.hajaetechblog.htbbackend.service;

import com.hajaetechblog.htbbackend.model.User;
import com.hajaetechblog.htbbackend.repository.HtbUserDetailRepository;
import com.hajaetechblog.htbbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class HtbUserDetailService implements UserDetailsService {

    private final HtbUserDetailRepository htbUserDetailRepository;

    @Autowired
    public HtbUserDetailService(HtbUserDetailRepository htbUserDetailRepository) {
        this.htbUserDetailRepository = htbUserDetailRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = htbUserDetailRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword()) // 암호화된 비밀번호를 반환
                .roles("USER") // 사용자 역할 설정
                .build();
    }
}
