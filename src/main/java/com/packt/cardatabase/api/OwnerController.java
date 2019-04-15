package com.packt.cardatabase.api;

import com.packt.cardatabase.domain.model.Owner;
import com.packt.cardatabase.domain.repository.OwnerRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OwnerController {

    private final OwnerRepository ownerRepository;

    public OwnerController(final OwnerRepository ownerRepository)
    {
        this.ownerRepository = ownerRepository;
    }

    @RequestMapping("/owners")
    public Iterable<Owner> getOwners()
    {
        return ownerRepository.findAll();
    }

}
