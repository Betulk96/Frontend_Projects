package com.tpe.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tpe.domain.enums.CategoryType;
import com.tpe.domain.enums.LanguageName;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "film_id")
    @Setter(AccessLevel.NONE)
    private Long filmID;

    @NotBlank(message = "Film ismi Girmelisiniz")
    @Size(min = 2, max = 50, message = "First name '${validatedValue}' must be between {min} and {max} long")
    @Column(nullable = false,unique = true,length = 50)
    private String movieName;


    private Integer relaseYear;

    private Double imdbScore;


    private Integer length;

    @Setter(AccessLevel.NONE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy", timezone = "Turkey")
    private LocalDateTime lastUpdate=LocalDateTime.now();

    @ManyToMany//lazy de kalsın istersek actorler gelsin
    @JoinTable(name = "film_actor",//3.oluşacak tablonun adı
            joinColumns = {@JoinColumn(name = "film_id")},//tablo adı
            inverseJoinColumns = {@JoinColumn(name = "actor_id")})//bağlantılı tablo
    private Set<Actor> actorSet = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "language_name")
    private LanguageName languageName;

    @Enumerated(EnumType.STRING)
    @Column(length = 30,nullable = false)
    private CategoryType categoryType;




}



