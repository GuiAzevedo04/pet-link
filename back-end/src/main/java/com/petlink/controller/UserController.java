package com.petlink.controller;

import com.petlink.data.dto.UserResponseDTO;
import com.petlink.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cliente")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserResponseDTO userResponseDTO){
        System.out.println(userResponseDTO);
        var emailPassword = new UsernamePasswordAuthenticationToken(userResponseDTO.getEmail(), userResponseDTO.getPassword());
        System.out.println(emailPassword.getDetails());
        var auth = this.authenticationManager.authenticate(emailPassword);

        return ResponseEntity.ok().body(auth.getDetails());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserResponseDTO userResponseDTO){
        return userService.register(userResponseDTO);
    }
}
