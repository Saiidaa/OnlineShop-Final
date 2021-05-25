package com.example.saidaproject.controllers;

;
import com.example.saidaproject.models.Users;
import com.example.saidaproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class MainController {
    @Autowired
    private UserService userServirce;

    @GetMapping(value = "/profile")
    public ResponseEntity<?> profilePage(){

        Users user = getUser();
        return new ResponseEntity<>(new UserDTO(user.getId(), user.getLogin(), user.getRoles()), HttpStatus.OK);
    }

    @PostMapping(value = "/updatepassword")
    public ResponseEntity<?> updatepassword(@RequestBody UserUpdatePassword userUpdatePassword) {
        Users user = getUser();
        user = userServirce.updateUserpassword(user, userUpdatePassword.getOldpassword(), userUpdatePassword.getPassword());
        if (user != null) {
            return new ResponseEntity<>(new UserDTO(user.getId(), user.getLogin(), user.getRoles()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private Users getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            Users user = (Users) authentication.getPrincipal();
            return user;
        }
        return null;
    }

}
