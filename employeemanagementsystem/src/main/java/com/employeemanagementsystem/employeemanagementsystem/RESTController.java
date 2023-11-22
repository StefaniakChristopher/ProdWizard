package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Controller;
import jakarta.servlet.http.HttpSession;

@RestController
public class RESTController {

    static User admin = new User("admin", "please", "hi", "clean the fridge", "none");
    static User userNotFound = new User(null, null, null, null, "none");
    int TaskIDcounter = 0;

    ArrayList<Double> taskDataList = new ArrayList<>();
       
    private static ArrayList<TaskStatsPerUserPerTask> taskStatsForAllTasks = new ArrayList<>();
    private static ArrayList<AllCompletedTasks> allCompletedTasksArrayList = new ArrayList<>();
    private static ArrayList<User> users = new ArrayList<>();
    private static ArrayList<Task> currentTasks = new ArrayList<>();
    private static ArrayList<String> taskCategories = new ArrayList<>();
    private static ArrayList<LeaderBoardUser> leaderboardUsers = new ArrayList<>();

    public static ArrayList<User> getUsers(){
        return users;
    }

    public static ArrayList<Task> getTasks(){
        return currentTasks;
    }

    public static ArrayList<AllCompletedTasks> getAllCompletedTasksArrayList(){
        return allCompletedTasksArrayList;
    }

    public static ArrayList<TaskStatsPerUserPerTask> getTaskStatsForAllTasks(){
        return taskStatsForAllTasks;
    }

    public static ArrayList<LeaderBoardUser> getLeaderboardUsers(){
        return leaderboardUsers;
    }


    public RESTController() {
        users.add(admin);
        users.add(userNotFound);
        TaskData.taskDataLists.put("Sorting", taskDataList);
        taskDataList.add((double) 34);
        taskDataList.add((double) 25);
        taskDataList.add((double) 56);
        taskDataList.add((double) 87);
        taskDataList.add((double) 65);
    }
    

    @PostMapping(value = "/login")
    public String getUser(@RequestBody User SubmittedUsernameAndPassword, HttpSession session) {
        
        User userToLogin = Find.loginUser(SubmittedUsernameAndPassword);
        if (userToLogin != userNotFound) {
            String newSessionID = session.getId();
            userToLogin.setSessionID(newSessionID); //does updating the userToLogin update that object in the arrayList? (i think so)
            return newSessionID;
        }
        System.out.println("Could not find user");
        return "FAILED";
    }

    @PostMapping("/session")
    public User verifySessionID(@RequestBody String sessionID) {
        return Find.findSessionID(sessionID);
    }

    @PostMapping("/newuser")
    public Boolean createUser(@RequestBody User SubmittedUser) {
        User foundUser = Find.findUser(SubmittedUser.getUsername());
        if (foundUser == userNotFound) {
            User createdUser = new User(
                SubmittedUser.getUsername(), 
                SubmittedUser.getPassword(), 
                SubmittedUser.getTeam(),
                null, 
                "none"
            );
            System.out.println(createdUser);
            System.out.println(createdUser.getUsername());
            
            users.add(createdUser);
            System.out.println(createdUser.getTeam());
            if (!TeamData.getTeams().contains(createdUser.getTeam())) {
                TeamData.addTeam(createdUser.getTeam());
            }
            return true;
        } else {
            System.out.println("User alr exists");
            return false;
        }
    }

    @PostMapping("/signout")
    public void signOut(@RequestBody String sessionID) {
        User userToSignOut = Find.findSessionID(sessionID);
        userToSignOut.setSessionID("none");
    }

    @PostMapping("/createTask")
    public String createTask(@RequestBody Task taskToCreate) { //maybe dropdown menu to create tasks
        String originOfRequestSessionID = taskToCreate.originOfRequestSessionID();
        double avgRate = 0;
        User originUser = Find.findSessionID(originOfRequestSessionID);
        TaskStatsPerUserPerTask foundTaskStats = Find.findTaskStatsByTaskNameAndUser(taskToCreate.taskName(), originUser.getUsername());
        if( foundTaskStats == null) {
            if(Find.findAllCompletedTasks(taskToCreate.taskName()) == null) {
                AllCompletedTasks allCompletedTasks = new AllCompletedTasks(taskToCreate.taskName());
                allCompletedTasksArrayList.add(allCompletedTasks);
            }
            avgRate = 0;
            TaskStatsPerUserPerTask taskstats = new TaskStatsPerUserPerTask(taskToCreate.taskName(), originUser.getUsername());
            taskStatsForAllTasks.add(taskstats);
            System.out.println("taskstats was created");
        } else {
            avgRate = foundTaskStats.getMean();
        }

        // if (!TaskData.taskDataLists.containsKey(taskToCreate.taskName())) {
        //     TaskData.createTaskDataArray(taskToCreate.taskName());
        // } else {
        //     avgRate = Statistics.meanValue(TaskData.taskDataLists.get(taskToCreate.taskName()));
        // }

        Task newTask = new Task(
            taskToCreate.taskName(), 
            taskToCreate.taskDescription(), 
            null,
            0,
            TaskIDcounter,  
            avgRate , 
            originUser.getTeam(), 
            originUser.getUsername(), 
            System.currentTimeMillis()
        );
        TaskIDcounter += 1;
        System.out.println("task that was created: " + newTask);
        currentTasks.add(newTask);
        originUser.getCurrentUserTasks().add(newTask);
        return "hi";
    }

    @GetMapping("/retrieveTasks")
    public ArrayList<Task> retieveTasks() {
        return currentTasks;
    }

    @PostMapping(value = "/completeTask/{taskID}")
    public boolean completeTask(@RequestBody Task taskIDandVolume) {
        Task taskToDelete = Find.findTaskByID(taskIDandVolume.id());
        double completionTime = System.currentTimeMillis() - taskToDelete.taskStartTime();
        completionTime = (completionTime/(1000*60));
        double rate = taskIDandVolume.volume()/completionTime;
        System.out.println("rate: " + rate);
        AllCompletedTasks foundTaskStatsArray = Find.findAllCompletedTasks(taskToDelete.taskName());
        TaskStatsPerUserPerTask foundTaskStats = Find.findTaskStatsByTaskNameAndUser(taskToDelete.taskName(), taskToDelete.taskOwner());
        double oldMean = foundTaskStats.getMean();
        foundTaskStatsArray.getCompletedTasks().remove(oldMean); //We need to remove the old mean so that it doesnt exist in our placement calculation
        foundTaskStats.addStat(rate);
        rate = (double)Math.round(rate * 100d) / 100d;
        double newMean = foundTaskStats.getMean();

        
        foundTaskStatsArray.getCompletedTasks().add(newMean);

        currentTasks.remove(taskToDelete); // use System.currentTimeMillis(); to track how long it took for the task to be completed
        CompletedTask completedTask = new CompletedTask(completionTime, taskToDelete.taskName(), taskIDandVolume.volume(), taskToDelete.taskDescription(), rate, taskToDelete.taskOwner());
        User taskCompleter = Find.findUser(taskToDelete.taskOwner());
        System.out.println(taskCompleter.getUsername());
        taskCompleter.getCompletedTasks().add(completedTask);
        System.out.println(taskCompleter.getCompletedTasks());
        taskCompleter.getCurrentUserTasks().remove(taskToDelete);
        taskCompleter.setAmountOfTasksCompleted(taskCompleter.getAmountOfTasksCompleted() + 1);


        return true;
    }

    @PostMapping("/retrieveCompletedTasks")
    public ArrayList<CompletedTask> retieveCompletedTasks(@RequestBody String sessionID) {
        User ownerOfCompletedTasks = Find.findSessionID(sessionID);
        System.out.println(ownerOfCompletedTasks.getUsername());
        System.out.println(ownerOfCompletedTasks.getCompletedTasks());
        return ownerOfCompletedTasks.getCompletedTasks();
    }

    @PostMapping("/retrieveCurrentUserTasks")
    public ArrayList<Task> retieveCurrentUserTasks(@RequestBody String sessionID) {
        User ownerOfCurrentTasks = Find.findSessionID(sessionID);
        return ownerOfCurrentTasks.getCurrentUserTasks();
    }

    @PostMapping("/createTaskCategory")
    public boolean createTaskCategory(@RequestBody String taskCategory) {
        String parsedTaskCategory = Misc.stringParser(taskCategory);
        if (taskCategories.contains(parsedTaskCategory)) {
            System.out.println("Category alr exists");
            return false;
        } else {
            taskCategories.add(parsedTaskCategory);
            return true;
        }
    }

    @GetMapping("/retrieveTaskCategories")
    public ArrayList<String> retrieveTaskCategories() {
        return taskCategories;
    }
       
    @PostMapping("/retrieveSearchedUser")
    public User retrieveSearchedUser(@RequestBody String username) {
        String processedUsername = Misc.stringParser(username);
        System.out.println(processedUsername);
        User searchedUser = Find.findUser(processedUsername);
        return searchedUser;
    }

    @PostMapping("/retrievePlacement")
    public int retrievePlacement(@RequestBody TaskStatsPerUserPerTask taskNameAndUser) {
        String taskName = taskNameAndUser.getTaskCategory();
        String user = taskNameAndUser.getTaskStatsUser();
        TaskStatsPerUserPerTask taskStats = Find.findTaskStatsByTaskNameAndUser(taskName, user);
        double mean = taskStats.getMean();
        AllCompletedTasks masterTaskList = Find.findAllCompletedTasks(taskName);
        int placement = masterTaskList.givePlacement(mean);
        return placement;
        
    }


    @PostMapping("/produceLeaderboard")
    public ArrayList<LeaderBoardUser> produceLeaderboard(@RequestBody String taskName) {
        leaderboardUsers.clear();
        String processedTaskName = Misc.stringParser(taskName);
        System.out.println(processedTaskName);
        AllCompletedTasks allCompletedTasksForSpecifiedTask = Find.findAllCompletedTasks(processedTaskName);
        ArrayList<String> leaderboard = allCompletedTasksForSpecifiedTask.createLeaderboard();
        for (String person: leaderboard) {
            System.out.println(person);
            TaskStatsPerUserPerTask taskNameAndUser = Find.findTaskStatsByTaskNameAndUser(processedTaskName, person);
            double mean = taskNameAndUser.getMean();
            LeaderBoardUser user = new LeaderBoardUser(person, allCompletedTasksForSpecifiedTask.givePlacement(mean), mean);
            leaderboardUsers.add(user);
        }
        ArrayList<LeaderBoardUser> reversedLeaderboard = new ArrayList<>();
        for (int i = leaderboardUsers.size() - 1 ; i >= 0; i-- ) {
            reversedLeaderboard.add(leaderboardUsers.get(i));
        }
        return reversedLeaderboard;
    }
    
}