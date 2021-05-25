package com.example.saidaproject.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name="purchases")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;


    @Column(name="fullname")
    private String fullname;

    @Column(name="credit_card")
    private String credit_card;

    @Column(name="cvv")
    private String cvv;

    @ManyToOne
    private Product product;

    @OneToOne
    private Users user;
}
