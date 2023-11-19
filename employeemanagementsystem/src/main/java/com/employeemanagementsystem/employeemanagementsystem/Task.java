package com.employeemanagementsystem.employeemanagementsystem;

public record Task(
    String taskName,
    String taskDescription,
    String originOfRequestSessionID,
    int volume,
    
    int id,
    double avgRate,
    String team,
    String taskOwner,
    long taskStartTime
    
) {}
