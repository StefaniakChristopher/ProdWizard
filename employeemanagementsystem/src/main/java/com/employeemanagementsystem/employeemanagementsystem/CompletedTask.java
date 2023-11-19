package com.employeemanagementsystem.employeemanagementsystem;

public record CompletedTask(
    double timeToComplete,
    String taskName,
    int volume,
    String taskDescriptionString,
    double rate,
    String taskCompleter


) {}
