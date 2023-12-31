package com.hajaetechblog.htbbackend.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@DynamoDBTable(tableName = "RefreshTokens")
public class RefreshToken {
    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    private String id;
    @DynamoDBAttribute
    private String username;
    @DynamoDBAttribute
    private String refreshToken;
    @DynamoDBAttribute
    private Date expiresIn; 
}