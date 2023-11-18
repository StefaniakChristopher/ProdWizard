package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TaskData {
    public static Map<String, ArrayList<Double>> taskDataLists = new HashMap<>();

    public static void createTaskDataArray(String taskName) {
        ArrayList<Double> taskDataList = new ArrayList<>();
        taskDataLists.put(taskName, taskDataList);
    }

    public static ArrayList<Double> gettaskDataList(String taskName) {
        return taskDataLists.get(taskName);
    }
}
