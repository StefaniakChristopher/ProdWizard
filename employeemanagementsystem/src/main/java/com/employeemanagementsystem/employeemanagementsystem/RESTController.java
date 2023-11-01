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

    User admin = new User("admin", "please", "clean the fridge", true);
    ArrayList<User> users = new ArrayList<>();
    

    @PostMapping(value = "/login")
    public LoginData getUser(@RequestBody UserCredentials SubmittedUsernameAndPassword) {
        
        for (User user : users) {
            System.out.println(user);
            System.out.println(SubmittedUsernameAndPassword.username());
            System.out.println(SubmittedUsernameAndPassword.password());
            if (SubmittedUsernameAndPassword.username().equals(user.username())) {
                if (SubmittedUsernameAndPassword.password().equals(user.password())) {
                    return LoginData;
                }
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

    // @PostMapping("/users")
    // public void recieveUser(@RequestBody User user) {

        
    // }
}