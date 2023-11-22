
package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class AllCompletedTasks { 
    
    private ArrayList<Double> completedTaskRatesAcrossUsers = new ArrayList<>();
    private String taskCategory;

    public AllCompletedTasks(String taskCategory) {
        this.taskCategory = taskCategory;
        
    }

    public ArrayList<Double> getCompletedTasks() {
        return completedTaskRatesAcrossUsers;
    }

    public String getTaskCategory() {
        return taskCategory;
    }


    public int givePlacement(double currentMean) {
        int placement = 0;
        Collections.sort(completedTaskRatesAcrossUsers);
        for (double rate: completedTaskRatesAcrossUsers) {
            System.out.println(completedTaskRatesAcrossUsers);
            placement++;
            if (rate == currentMean) {
                break;
            }
        }
        int realPlacement = completedTaskRatesAcrossUsers.size() + 1 - placement; //Collections.sort is in ascending order from left to right
        System.out.println(realPlacement);
        return realPlacement;
    }

    public ArrayList<String> createLeaderboard() {
        ArrayList<String> leaderboardUsers = new ArrayList<>();
        Collections.sort(completedTaskRatesAcrossUsers);
        for (double rate: completedTaskRatesAcrossUsers) {
            String user = Find.findTaskStatsByTaskNameAndUserUsingMean(taskCategory, rate);
            leaderboardUsers.add(user);
        }
        return leaderboardUsers;
    }
}
