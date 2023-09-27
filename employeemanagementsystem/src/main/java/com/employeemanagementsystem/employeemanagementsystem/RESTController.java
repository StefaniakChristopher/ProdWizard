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

    ArrayList<user> users = new ArrayList<>();

    @GetMapping(value = "/users/{userID}")
    public user getUser(@RequestBody UserCredentials userIDandPassword) {
// http://localhost:8080/users/1
        for (user user : users) {
            return user;
        }
        System.out.println("Could not find user");
        return null;
    }

    @DeleteMapping(value = "/users/{userID}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer userID) {
        return null;
        
    }

    @PostMapping("/users")
    public void recieveUser(@RequestBody user user) {

        
    }
}