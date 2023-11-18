package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;

public class User {
    private String username;
    private String password;
    private String team;
    private String tasks;
    private String sessionID;
    private ArrayList<CompletedTask> completedTasks = new ArrayList<>();

    public User(String username, String password, String team, String tasks, String sessionID) {
        this.username = username;
        this.password = password;
        this.team = team;
        this.tasks = tasks;
        this.sessionID = sessionID;
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
}


