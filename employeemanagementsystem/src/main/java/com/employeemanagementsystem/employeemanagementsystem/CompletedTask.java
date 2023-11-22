package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;

public class CompletedTask {
    private double timeToComplete;
    private String taskName;
    private int volume;
    private String taskDescriptionString;
    private double rate;
    private String taskCompleter;
    private int placement;
    

    // Constructor
    public CompletedTask(double timeToComplete, String taskName, int volume, String taskDescriptionString,
                         double rate, String taskCompleter) {
        this.timeToComplete = timeToComplete;
        this.taskName = taskName;
        this.volume = volume;
        this.taskDescriptionString = taskDescriptionString;
        this.rate = rate;
        this.taskCompleter = taskCompleter;
        placement = 0;
    }

    // Getters
    public double getTimeToComplete() {
        return timeToComplete;
    }

    public String getTaskName() {
        return taskName;
    }

    public int getVolume() {
        return volume;
    }

    public String getTaskDescriptionString() {
        return taskDescriptionString;
    }

    public double getRate() {
        return rate;
    }

    public String getTaskCompleter() {
        return taskCompleter;
    }
    public int getPlacement() {
        return placement;
    }
    public void setPlacement(int placement) {
        this.placement = placement;
    }
}