package com.employeemanagementsystem.employeemanagementsystem;

public record Task(
    String taskName,
    String taskDescription,
    String originOfRequestSessionID,
    
    
    int id,
    double avgTimeToComplete,
    String team,
    String taskOwner,
    long taskStartTime
) {}
