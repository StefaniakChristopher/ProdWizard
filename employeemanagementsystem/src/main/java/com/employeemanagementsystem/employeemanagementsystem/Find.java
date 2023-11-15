package com.employeemanagementsystem.employeemanagementsystem;

public class Find {

    public static User findUser(User SubmittedUsernameAndPassword) {
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

    public static User findSessionID(String sessionID) {
        String proccessedSessionID = sessionID.replace("\"", "");
        for (User user: RESTController.getUsers()) {
            System.out.println("Current sessionID" + proccessedSessionID);
            System.out.println("User sessionID" + user.getSessionID());
            if(proccessedSessionID.equals(user.getSessionID()) && proccessedSessionID != "none") {
                return user;
            }
        }
        return RESTController.userNotFound;
    }

}