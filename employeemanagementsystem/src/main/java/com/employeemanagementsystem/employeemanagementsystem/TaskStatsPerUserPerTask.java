package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;

public class TaskStatsPerUserPerTask {
    private ArrayList<Double> rates = new ArrayList<>();
    private String taskCategory;
    private String taskStatsUser;
    private double mean;

    public TaskStatsPerUserPerTask(String taskCategory, String taskStatsUser) {
        this.taskCategory = taskCategory;
        this.taskStatsUser = taskStatsUser;
        mean = 0;
        
    }

    public double getMean() {
        return Statistics.meanValue(rates);
    }

    public String getTaskCategory() {
        return taskCategory;
    }

    public String getTaskStatsUser() {
        return taskStatsUser;
    }

    public void addStat(double stat) {
        rates.add(stat);
    }
}
