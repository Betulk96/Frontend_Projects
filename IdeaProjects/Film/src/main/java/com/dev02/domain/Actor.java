package com.tpe.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tpe.domain.enums.Gender;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "actor_id")
    @Setter(AccessLevel.NONE)
    private Long actorId;

    @NotBlank(message = "Aktör ismi Girmelisiniz")
    @Size(min = 2, max = 50, message = "First name '${validatedValue}' must be between {min} and {max} long")
    @Column(nullable = false,unique = true,length = 50)
    private String name;

    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @ManyToMany(mappedBy = "actorSet", cascade = CascadeType.DETACH)//actorlSet in olacağı classtan setleme işlemi yapılacak
    @JsonIgnore//tostirng de tekrar obje üretmesin diye
    private Set<Film> filmSet = new HashSet<>();


}
