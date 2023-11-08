package com.employeemanagementsystem.employeemanagementsystem;

public record User(
    String username,
    String password,
    String tasks,
    boolean apiToken
) {}
    

