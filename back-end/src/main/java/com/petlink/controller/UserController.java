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
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

        try {
            var emailPassword = new UsernamePasswordAuthenticationToken(userResponseDTO.getEmail(), userResponseDTO.getPassword());
            var auth = this.authenticationManager.authenticate(emailPassword);
            var token = tokenService.generateToken((User) auth.getPrincipal());
            return ResponseEntity.status(HttpStatus.OK).body(Map.of("token", token));
        }

        catch (BadCredentialsException exception){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "E-mail ou senha inválidos."));
        }

        catch (Exception exception){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Aconteceu um erro ao tentar realizar o login"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserResponseDTO userResponseDTO){
        return userService.register(userResponseDTO);
    }

    @DeleteMapping("delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        return userService.deleteUser(userId);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(){
        try {
            User userLogged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return ResponseEntity.status(HttpStatus.OK).body(userLogged);
        }
        catch (Exception exception){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "É preciso estar autenticado."));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId){
        return ResponseEntity.ok().body(userService.getUserById(userId));
    }
}
