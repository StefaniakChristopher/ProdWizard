package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TaskData {
    public static Map<String, ArrayList<Integer>> taskDataLists = new HashMap<>();

    public static void createTaskDataArray(String taskName) {
        ArrayList<Integer> taskDataList = new ArrayList<>();
        taskDataLists.put(taskName, taskDataList);
    }

    public static ArrayList<Integer> gettaskDataList(String taskName) {
        return taskDataLists.get(taskName);
    }
}
