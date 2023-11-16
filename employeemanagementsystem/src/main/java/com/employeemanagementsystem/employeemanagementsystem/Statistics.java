package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;

public class Statistics {
    public static double meanValue(ArrayList<Integer> taskData){
        double sum = 0;
        for(int integer: taskData) {
            sum += integer;
        }
        double mean = sum/taskData.size();

        return mean;
    }
}
