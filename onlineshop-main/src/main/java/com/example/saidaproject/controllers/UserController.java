package com.example.saidaproject.controllers;


import com.example.saidaproject.jwt.JwtTokenGenerator;
import com.example.saidaproject.models.JwtRequests;
import com.example.saidaproject.models.JwtResponse;
import com.example.saidaproject.models.Users;
import com.example.saidaproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = "/auth")
    public ResponseEntity<?> auth(@RequestBody JwtRequests request) throws Exception{
        System.out.println("Auth");
        authenticate(request.getLogin(), request.getPassword());
        System.out.println(request);
        final UserDetails userDetails =
                userService.loadUserByUsername(request.getLogin());
        final String token = jwtTokenGenerator.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody Users u) throws Exception{
        String password = u.getPassword();
        System.out.println(u);
            if(userService.createUser(u) !=null ){
                authenticate(u.getLogin(), password);
                final UserDetails userDetails =
                        userService.loadUserByUsername(u.getLogin());
                final String token = jwtTokenGenerator.generateToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(token));
            }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public void authenticate(String email, String password) throws Exception{
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        }catch (DisabledException e){
            throw new Exception("USER_DISABLED", e);
        }catch (BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
