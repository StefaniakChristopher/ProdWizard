package com.employeemanagementsystem.employeemanagementsystem;

public record Task(
    String taskName,
    String taskDescription,
    int avgTimeToComplete,
    
    String team,
    String taskOwner
) {}
