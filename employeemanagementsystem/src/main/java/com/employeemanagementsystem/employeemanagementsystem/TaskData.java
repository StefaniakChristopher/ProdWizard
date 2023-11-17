package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TaskData {
    public static Map<String, ArrayList<Long>> taskDataLists = new HashMap<>();

    public static void createTaskDataArray(String taskName) {
        ArrayList<Long> taskDataList = new ArrayList<>();
        taskDataLists.put(taskName, taskDataList);
    }

    public static ArrayList<Long> gettaskDataList(String taskName) {
        return taskDataLists.get(taskName);
    }
}
