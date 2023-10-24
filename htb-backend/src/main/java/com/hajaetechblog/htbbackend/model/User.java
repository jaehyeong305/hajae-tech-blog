package com.hajaetechblog.htbbackend.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIgnore;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@Setter
@DynamoDBTable(tableName = "Users")
public class User implements UserDetails {
    @DynamoDBHashKey
    private String id;
    @DynamoDBAttribute
    private String username;
    @DynamoDBAttribute
    private String email;
    @DynamoDBAttribute
    private String password;
    @DynamoDBIgnore
    private Collection<? extends GrantedAuthority> authorities;

    public User() {}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    @DynamoDBIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", userName='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}