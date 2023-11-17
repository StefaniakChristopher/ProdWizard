package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;

public class TeamData {
    private static ArrayList<String> teams = new ArrayList<>();

    public static void addTeam(String team) {
        teams.add(team);
    }

    public static void removeTeam(String team) {
        teams.remove(team);
    }

    public static ArrayList<String> getTeams() {
        return teams;
    }
}
