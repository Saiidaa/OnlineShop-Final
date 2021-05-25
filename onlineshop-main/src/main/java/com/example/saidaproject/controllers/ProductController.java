package com.example.saidaproject.controllers;

import com.example.saidaproject.models.Product;
import com.example.saidaproject.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping(value = "/products")
    public ResponseEntity<?> getProducts(){
        System.out.println("foods");
        List<Product> products = productRepository.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping(value = "/getproduct/{id}")
    public ResponseEntity<?> getFood(@PathVariable(name = "id")Long id){

        Product product = productRepository.findById(id).get();
        return ResponseEntity.ok(product);
    }

    @PostMapping(value = "/add/product")
    public ResponseEntity<?> addProduct(@RequestBody Product product){
        System.out.println(product);
        product = productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @PutMapping(value = "/save/product")
    public ResponseEntity<?> saveProduct(@RequestBody Product product){
        System.out.println(product);
        product = productRepository.save(product);
        return ResponseEntity.ok(product);
    }


    @DeleteMapping(value = "/deleteproduct")
    public ResponseEntity<?> delete(@RequestBody Product product){
        Long id = product.getId();
        productRepository.deleteById(id);
        return ResponseEntity.ok(id);
    }
}
