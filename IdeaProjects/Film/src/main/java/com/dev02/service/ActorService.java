package com.tpe.service;

import com.tpe.domain.Actor;
import com.tpe.exception.ConflictException;
import com.tpe.repository.ActorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActorService {
    private final ActorRepo actorRepo;
    public void saveActor(Actor actor) {

        boolean isExist=actorRepo.existsByName(actor.getName());

        if (isExist){
            throw new ConflictException("Girdiğiniz Aktör isminde bir Aktör vardır.");
        }
        actorRepo.save(actor);

    }
}
