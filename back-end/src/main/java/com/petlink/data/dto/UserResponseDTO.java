package com.petlink.data.dto;

import com.petlink.data.entity.UserRole;
import lombok.Data;

@Data
public class UserResponseDTO {
    private Long idUser;
    private String name;
    private String password;
    private String email;
    private String cpf;
    private String phone;
    private String adress;
    private UserRole role;
}
