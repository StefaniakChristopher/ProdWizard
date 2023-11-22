package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;

public class User {
    private String username;
    private String password;
    private String team;
    private String tasks;
    private String sessionID;
    private int amountOfTasksCompleted;
    private ArrayList<CompletedTask> completedTasks = new ArrayList<>();
    private ArrayList<Task> currentUserTasks = new ArrayList<>();

    public User(String username, String password, String team, String tasks, String sessionID) {
        this.username = username;
        this.password = password;
        this.team = team;
        this.tasks = tasks;
        this.sessionID = sessionID;
        this.amountOfTasksCompleted = 0;
    }

    public String getUsername() {
        return username;
    }

    // Getter for tasks
    public String getTasks() {
        return tasks;
    }

    public String getPassword() {
        return password;
    }

    public void setTasks(String tasks) {
        this.tasks = tasks;
    }

    public int getAmountOfTasksCompleted() {
        return amountOfTasksCompleted;
    }

    public void setAmountOfTasksCompleted(int amountOfTasksCompleted) {
        this.amountOfTasksCompleted = amountOfTasksCompleted;
    }

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getTeam() {
        return team;
    }

    public ArrayList<CompletedTask> getCompletedTasks() {
        return completedTasks;
    }

    public ArrayList<Task> getCurrentUserTasks() {
        return currentUserTasks;
    }
}


