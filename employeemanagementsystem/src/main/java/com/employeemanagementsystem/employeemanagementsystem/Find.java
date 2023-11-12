package com.employeemanagementsystem.employeemanagementsystem;

public class Find {

    public static User findUser(UserCredentials SubmittedUsernameAndPassword) {
        for (User user : RESTController.getUsers()) {
            if (SubmittedUsernameAndPassword.username().equals(user.getUsername())) {
                if (SubmittedUsernameAndPassword.password().equals(user.getPassword())) { // potentally add faster
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