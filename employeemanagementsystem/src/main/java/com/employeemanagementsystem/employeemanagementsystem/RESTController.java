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

    User admin = new User("admin", "please", "clean the fridge", "none");
    User failedAuth = new User(null, null, null, "none");
    ArrayList<User> users = new ArrayList<>();

    public RESTController() {
        users.add(admin);
        users.add(failedAuth);
    }
    

    @PostMapping(value = "/login")
    public String getUser(@RequestBody UserCredentials SubmittedUsernameAndPassword, HttpSession session) {
        
        for (User user : users) {
            if (SubmittedUsernameAndPassword.username().equals(user.getUsername())) {
                if (SubmittedUsernameAndPassword.password().equals(user.getPassword())) { // potentally add faster sorting algorithm
                    String newSessionID = session.getId();
                    user.setSessionID(newSessionID);
                    return newSessionID;
                }
            }

        }
        System.out.println("Could not find user");
        return "FAILED";
    }

    @PostMapping("/session")
    public User verifySessionID(@RequestBody String sessionID) {
        String proccessedSessionID = sessionID.replace("\"", "");
        System.out.println(proccessedSessionID);
        for (User user: users) {
            System.out.println("Current sessionID" + proccessedSessionID);
            System.out.println("User sessionID" + user.getSessionID());
            if(proccessedSessionID.equals(user.getSessionID()) && proccessedSessionID != "none") {
                return user;
            }
        }
        return failedAuth;
        
    }

    @DeleteMapping(value = "/users/{userID}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer userID) {
        return null;
        
    }

    // @PostMapping("/users")
    // public void recieveUser(@RequestBody User user) {

        
    // }
}