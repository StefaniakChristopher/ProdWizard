package com.employeemanagementsystem.employeemanagementsystem;

public record Task(
    String taskName,
    String taskDescription,
    String originOfRequestSessionID,
    
    double avgTimeToComplete,
    String team,
    String taskOwner
) {}
