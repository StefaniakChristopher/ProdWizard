package com.employeemanagementsystem.employeemanagementsystem;

import java.util.ArrayList;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RESTController {

    ArrayList<User> users = new ArrayList<>();

    User admin = new User("admin", "please",1);

    @GetMapping(value = "/users/{userID}")
    public User getUser(@RequestBody UserCredentials SubmittedUsernameAndPassword) {
        for (User user : users) {
            if (SubmittedUsernameAndPassword.username() == user.username())
                if (SubmittedUsernameAndPassword.password() == user.password()) {
                    return user;
                }
// potentally add faster sorting algorithm
        }
        System.out.println("Could not find user");
        return null;
    }

    @DeleteMapping(value = "/users/{userID}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer userID) {
        return null;
        
    }

    @PostMapping("/users")
    public void recieveUser(@RequestBody User user) {

        
    }
}