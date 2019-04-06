package com.packt.cardatabase.domain.repository;

import com.packt.cardatabase.domain.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
