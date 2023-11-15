package com.tpe.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Quantity can not be null")
    private Integer quantity;

    @NotNull(message = "Total price can not be null")
    private Double totalPrice;

    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull(message = "Product can not be null")
    private Product product;

    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull(message = "Customer can not be null")
    //TODO: json
    private Customer customer;

        //TODO:totalprice otomatik hesaplanmalı

    //ÖDEV:4-CustomerController Class
//     5-CustomerService Class
//     6-CustomerRepository interface
//     7-ProductController Class
//     8-ProductService Class
//     9-ProductRepository interface
//     10-OrderController Class
//     11-OrderService Class
//     12-OrderRepository interface
}