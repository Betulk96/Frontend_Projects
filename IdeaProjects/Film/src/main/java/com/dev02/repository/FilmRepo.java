package com.tpe.repository;

import com.tpe.domain.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilmRepo extends JpaRepository<Film, Long> {


    boolean existsByMovieName(String title);
}
