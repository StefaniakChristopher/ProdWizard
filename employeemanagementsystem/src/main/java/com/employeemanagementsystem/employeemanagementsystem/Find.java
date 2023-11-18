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
        for (Task task: RESTController.getTasks()) {
            if (task.id() == ID) {
                return task;
            }
        }
        return null;
    }

}