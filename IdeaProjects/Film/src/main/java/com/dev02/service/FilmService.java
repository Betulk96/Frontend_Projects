package com.tpe.service;

import com.tpe.domain.Film;
import com.tpe.exception.ConflictException;
import com.tpe.repository.FilmRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FilmService {

    private final FilmRepo filmRepo;
    public void saveMovie(Film film) {

        boolean isExist=filmRepo.existsByMovieName(film.getMovieName());

        if (isExist){//böyle bir film varsa
            throw new ConflictException("Bu İsimde Bir Film Vardır.Ekleme Başarısız!!");
        }
        //yoksa ekle
        filmRepo.save(film);

    }
}
