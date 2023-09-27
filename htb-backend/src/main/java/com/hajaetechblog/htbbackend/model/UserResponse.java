package com.hajaetechblog.htbbackend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private String username;

    public UserResponse(String username) {
        this.username = username;
    }
}