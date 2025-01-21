package com.petlink.service;

import com.petlink.data.dto.UserResponseDTO;
import com.petlink.data.entity.User;
import com.petlink.repository.UserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;


    public ResponseEntity<?> register(UserResponseDTO userResponseDTO){
        if(userRepository.findByEmail(userResponseDTO.getEmail()) != null){
            throw new RuntimeException("Email já registrado");
        }

        String encryptPassword = new BCryptPasswordEncoder().encode(userResponseDTO.getPassword());

        User user = toEntity(userResponseDTO, encryptPassword);

        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> deleteUser(Long id){
        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Usuario não encontrado com o ID: " + id)
        );
        userRepository.delete(user);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("message", "Usuario deletado com sucesso"));

    }

    public ResponseEntity<?> updateUser(Long id, UserResponseDTO userDto){
        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Usuario não encontrado com o ID: " + id)
        );
        if(userDto.getName() != null){
            user.setName(userDto.getName());
        }

        if(userDto.getEmail() != null){
            user.setEmail(userDto.getEmail());
        }

        if(userDto.getAdress() != null){
            user.setAdress(userDto.getAdress());
        }

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username);
    }


    private UserResponseDTO toDto(User entity) {
        UserResponseDTO user = new UserResponseDTO();
        user.setIdUser(entity.getId_user());
        user.setName(entity.getName());
        user.setPassword(entity.getPassword());
        user.setEmail(entity.getEmail());
        user.setCpf(entity.getCpf());
        user.setPhone(entity.getPhone());
        user.setAdress(entity.getAdress());
        user.setRole(entity.getRole());

        return user;
    }

    private User toEntity(UserResponseDTO dto, String hashPassword) {
        User user = new User();
        user.setId_user(dto.getIdUser());
        user.setName(dto.getName());
        user.setPassword(hashPassword);
        user.setEmail(dto.getEmail());
        user.setCpf(dto.getCpf());
        user.setPhone(dto.getPhone());
        user.setAdress(dto.getAdress());
        user.setRole(dto.getRole());

        return user;
    }
}
