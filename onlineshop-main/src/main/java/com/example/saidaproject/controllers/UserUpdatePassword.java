package com.example.saidaproject.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdatePassword {
    private String login;
    private String password;
    private String oldpassword;

    public String getOldpassword() {
        return this.oldpassword;
    }

    public String getPassword() {
        return this.password;
    }
}
