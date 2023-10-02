package com.hajaetechblog.htbbackend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Document(collection = "refresh_tokens")
public class RefreshToken {
    @Id
    private String id;
    private String username;
    private String refreshToken;
    private Date expiresIn; 
}