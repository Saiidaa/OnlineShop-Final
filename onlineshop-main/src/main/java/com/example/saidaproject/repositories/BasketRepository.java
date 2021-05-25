package com.example.saidaproject.repositories;

import com.example.saidaproject.models.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BasketRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findAllByUserId(Long id);
}
