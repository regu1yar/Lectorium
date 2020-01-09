package org.example.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Empty controller to trigger basic authentication with cookie
@RestController
class LoginController {
    @GetMapping("/login")
    public void login() {
    }
}
