package com.employeemanagementsystem.employeemanagementsystem;

public record LoginData(
    boolean loginSuccessful,
    User user
) {}