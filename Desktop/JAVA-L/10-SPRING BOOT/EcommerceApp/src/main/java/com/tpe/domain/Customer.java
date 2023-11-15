package com.tpe.domain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @NotBlank(message = "Name is required!")
    private String name;

    @NotBlank(message = "Lastname is required!")
    private String lastName;

    @NotBlank(message = "Email is required!")
    @Column(unique = true)
    @Email
    private String email;

    private String phone;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.REMOVE)
    private Set<OrderItem> orders=new HashSet<>();

}
