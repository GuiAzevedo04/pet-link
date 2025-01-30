package com.petlink.data.entity;

public enum UserRole {

    ADMIN("admin"),

    EMPLOYEE("employee"),

    USER("user");


    private String role;

    private UserRole(String role){
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
