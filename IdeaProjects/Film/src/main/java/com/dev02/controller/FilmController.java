package com.tpe.controller;

import com.tpe.domain.Film;
import com.tpe.service.FilmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/films")
@RequiredArgsConstructor
public class FilmController {

    private final FilmService filmService;

    @PostMapping("/add")
    public ResponseEntity<String> addMovie(@Valid @RequestBody Film film){
        filmService.saveMovie(film);

        return new ResponseEntity<>("Filminiz Başarıyla Kayıt Edilmiştir", HttpStatus.CREATED);//201
    }
}
