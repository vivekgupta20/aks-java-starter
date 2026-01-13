package com.example.identity.controller;

import com.example.identity.entity.User;
import com.example.identity.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class IdentityController {

    private final UserRepository userRepository;

    public IdentityController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/whoami")
    public Map<String, Object> whoami() {
        return Map.of("service", "identity-svc", "status", "ok");
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
