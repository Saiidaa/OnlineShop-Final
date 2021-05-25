package com.example.saidaproject.controllers;

import com.example.saidaproject.models.Product;
import com.example.saidaproject.models.Purchase;
import com.example.saidaproject.models.Users;
import com.example.saidaproject.repositories.BasketRepository;
import com.example.saidaproject.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class BasketController {

    @Autowired
    private BasketRepository basketRepository;

    @GetMapping(value = "/baskets")
    public ResponseEntity<?> getBaskets(){
        List<Purchase> purchases = basketRepository.findAll();

        return new ResponseEntity<>(purchases, HttpStatus.OK);
    }

    @GetMapping(value = "/getuserbaskets")
    public ResponseEntity<?> getUserPurchases(){
        Users user = getUser();

        List<Purchase> purchases = basketRepository.findAllByUserId(user.getId());
        return ResponseEntity.ok(purchases);
    }

    @PostMapping(value = "/add/purchase")
    public ResponseEntity<?> addPurchase(@RequestBody Purchase purchase){
        Users user = getUser();
        purchase.setUser(user);
        purchase = basketRepository.save(purchase);
        return ResponseEntity.ok(purchase);
    }


    @DeleteMapping(value = "/deletepurchase")
    public ResponseEntity<?> delete(@RequestBody Purchase purchase){
        Users user = getUser();
        purchase.setUser(user);
        Long id = purchase.getId();
        basketRepository.deleteById(id);
        return ResponseEntity.ok(id);
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
