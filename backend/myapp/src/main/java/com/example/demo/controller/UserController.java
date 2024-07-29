package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.LoginRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

   
        @PostMapping("/signup")
        public ResponseEntity<?> signUp(@RequestBody User user) {
            try {
                // Validate user input
                if (user == null || user.getPassword() == null || user.getPassword().isEmpty()) {
                    return ResponseEntity.badRequest().body("Invalid user data");
                }

                // Encode password
                user.setPassword(passwordEncoder.encode(user.getPassword()));

                // Save user to the database
                User savedUser = userRepository.save(user);
                return ResponseEntity.ok(savedUser);
            } catch (DataAccessException e) {
                // Handle database-related exceptions
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
            } catch (Exception e) {
                // Handle other exceptions
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
            }
        }
    


    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            return "Login successful!";
        } catch (AuthenticationException e) {
            return "Login failed: " + e.getMessage();
        }
    }
}
