package com.petlink.controller;

import com.petlink.data.dto.UserResponseDTO;
import com.petlink.data.entity.User;
import com.petlink.infra.Security.TokenService;
import com.petlink.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserResponseDTO userResponseDTO){
        var emailPassword = new UsernamePasswordAuthenticationToken(userResponseDTO.getEmail(), userResponseDTO.getPassword());
        var auth = this.authenticationManager.authenticate(emailPassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserResponseDTO userResponseDTO){
        return userService.register(userResponseDTO);
    }
}
