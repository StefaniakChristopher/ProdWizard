package com.employeemanagementsystem.employeemanagementsystem;

public record UserCredentials(
    String username,
    String password,
    boolean actualUser
) {}