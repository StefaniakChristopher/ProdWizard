package com.employeemanagementsystem.employeemanagementsystem;

public class User {
    private String username;
    private String password;
    private String tasks;
    private String sessionID;

    public User(String username, String password, String tasks, String sessionID) {
        this.username = username;
        this.password = password;
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
}


