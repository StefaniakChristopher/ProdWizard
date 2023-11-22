package com.employeemanagementsystem.employeemanagementsystem;

public class Find {

    public static User loginUser(User SubmittedUsernameAndPassword) {
        for (User user : RESTController.getUsers()) {
            if (SubmittedUsernameAndPassword.getUsername().equals(user.getUsername())) {
                if (SubmittedUsernameAndPassword.getPassword().equals(user.getPassword())) { // potentally add faster
                                                                                          // sorting algorithm
                    return user;
                }
            }
        }

        return RESTController.userNotFound;
    }

    public static User findUser(String userToFind) {
        for (User user : RESTController.getUsers()) {
            if (userToFind.equals(user.getUsername())) { 
                return user;
            }
        }

        return RESTController.userNotFound;
    }

    public static User findSessionID(String sessionID) {
        String proccessedSessionID = Misc.stringParser(sessionID);
        for (User user: RESTController.getUsers()) {
            System.out.println("Current sessionID" + proccessedSessionID);
            System.out.println("User sessionID" + user.getSessionID());
            if(proccessedSessionID.equals(user.getSessionID()) && proccessedSessionID != "none") {
                return user;
            }
        }
        return RESTController.userNotFound;
    }

    public static Task findTaskByID(int ID) {
        System.out.println("ALL TASKS: " + RESTController.getTasks());
        for (Task task: RESTController.getTasks()) {
            if (task.id() == ID) {
                return task;
            }
        }
        return null;
    }

    public static TaskStatsPerUserPerTask findTaskStatsByTaskNameAndUser(String taskName, String user) {
        System.out.println(taskName);
        System.out.println(user);
        for (TaskStatsPerUserPerTask taskstats : RESTController.getTaskStatsForAllTasks()) {
            System.out.println(taskstats.getTaskCategory());
            System.out.println(taskstats.getTaskStatsUser());
            if (taskstats.getTaskCategory().equals(taskName)) {
                if (taskstats.getTaskStatsUser().equals(user)) { 
                    return taskstats;
                }
            }
        }
        return null;
    }

    public static String findTaskStatsByTaskNameAndUserUsingMean(String taskName, double mean) {
        System.out.println(taskName);
        System.out.println(mean);
        for (TaskStatsPerUserPerTask taskstats : RESTController.getTaskStatsForAllTasks()) { //for use in producing leaderboard
            System.out.println(taskstats.getTaskCategory());
            System.out.println(taskstats.getMean());
            if (taskstats.getTaskCategory().equals(taskName)) {
                if (taskstats.getMean() == (mean)) { 
                    return taskstats.getTaskStatsUser();
                }
            }
        }
        return null;
    }


    public static AllCompletedTasks findAllCompletedTasks(String taskName) {
        for (AllCompletedTasks taskstats : RESTController.getAllCompletedTasksArrayList()) {
            if (taskstats.getTaskCategory().equals(taskName)) {
                    return taskstats;
            }
        }
        return null;
    }

}