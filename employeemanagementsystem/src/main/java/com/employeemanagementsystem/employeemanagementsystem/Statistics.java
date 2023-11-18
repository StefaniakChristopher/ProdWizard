package com.employeemanagementsystem.employeemanagementsystem;

import java.math.BigDecimal;
import java.util.ArrayList;

public class Statistics {

        
    public static double meanValue(ArrayList<Double> taskData){
        double sum = 0;
        for(Double number: taskData) {
            sum += number;
        }
        double mean = sum/taskData.size();

        mean = Math.round(mean);

        return mean;
    }
}
