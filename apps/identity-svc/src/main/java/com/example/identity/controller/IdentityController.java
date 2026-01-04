
package com.example.identity.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class IdentityController {
    @GetMapping("/whoami")
    public Map<String, Object> whoami() {
        return Map.of("service", "identity-svc", "status", "ok");
    }
}
