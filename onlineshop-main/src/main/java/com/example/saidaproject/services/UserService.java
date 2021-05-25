package com.example.saidaproject.services;


import com.example.saidaproject.models.Roles;
import com.example.saidaproject.models.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    Users createUser(Users users);
    Users saveUser(Users user);
    Users getUserByEmail(String email);

    Users updateUserpassword(Users user, String oldpassword, String newPassword);

    List<Users> getAllUsers();

    Users getUser(Long id);

    List<Roles> getAllRoles();

    Roles addRoles(Roles role);

    Roles saveRole(Roles role);

    Roles getRole(Long id);

    void deletRole(Roles role);

}
