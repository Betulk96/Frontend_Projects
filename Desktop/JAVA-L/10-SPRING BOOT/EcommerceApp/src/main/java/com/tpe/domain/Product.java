package com.tpe.domain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @NotBlank(message = "Product name is required!")
    @Column(unique = true)
    private String productName;

    @NotBlank(message = "Product brand is required!")
    private String brand;

    @NotNull(message = "Price can not be null!")
    private Double price;

    public Product(String productName, String brand, Double price) {
        this.productName = productName;
        this.brand = brand;
        this.price = price;
    }

}