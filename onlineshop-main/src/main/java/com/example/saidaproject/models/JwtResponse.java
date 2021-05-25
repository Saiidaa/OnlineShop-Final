package com.example.saidaproject.models;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = 987654321L;
    private final String jwtToken;

    public JwtResponse(String token){
        this.jwtToken = token;
    }

    public String getJwtToken(){
        return this.jwtToken;
    }
}
