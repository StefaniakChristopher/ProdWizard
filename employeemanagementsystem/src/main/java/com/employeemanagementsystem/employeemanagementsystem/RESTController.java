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

    static User admin = new User("admin", "please", "clean the fridge", "none");
    static User userNotFound = new User(null, null, null, "none");
    private static ArrayList<User> users = new ArrayList<>();

    public static ArrayList<User> getUsers(){
        return users;
    }

    public RESTController() {
        users.add(admin);
        users.add(userNotFound);
    }
    

    @PostMapping(value = "/login")
    public String getUser(@RequestBody UserCredentials SubmittedUsernameAndPassword, HttpSession session) {
        
        User userToLogin = Find.findUser(SubmittedUsernameAndPassword);
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
    public Boolean createUser(@RequestBody UserCredentials SubmittedUsernameAndPassword) {
        User foundUser = Find.findUser(SubmittedUsernameAndPassword);
        if (foundUser == userNotFound) {
            User createdUser = new User(SubmittedUsernameAndPassword.username(), SubmittedUsernameAndPassword.password(), null, "none");
            System.out.println(createdUser);
            System.out.println(createdUser.getUsername());
            users.add(createdUser);
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

    @DeleteMapping(value = "/users/{userID}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer userID) {
        return null;
        
    }

    // @PostMapping("/users")
    // public void recieveUser(@RequestBody User user) {

        
    // }
}