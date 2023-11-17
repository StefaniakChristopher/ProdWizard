package com.employeemanagementsystem.employeemanagementsystem;

import java.math.BigDecimal;
import java.util.ArrayList;

public class Statistics {

        
    public static double meanValue(ArrayList<Long> taskData){
        double sum = 0;
        for(Long integer: taskData) {
            sum += integer;
        }
        double mean = sum/taskData.size();

        mean = Math.round(mean);

        return mean;
    }
}
