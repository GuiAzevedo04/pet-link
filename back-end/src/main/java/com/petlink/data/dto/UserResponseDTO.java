package com.petlink.data.dto;

import com.petlink.data.entity.User;
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

    public UserResponseDTO(User user) {
        this.idUser = user.getId_user();
        this.name = user.getName();
        this.password = null;
        this.email = user.getEmail();
        this.cpf = user.getCpf();
        this.phone = user.getPhone();
        this.adress = user.getAdress();
        this.role = user.getRole();
    }
    public UserResponseDTO() {
    }


}