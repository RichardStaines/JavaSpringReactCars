package com.packt.cardatabase.domain.repository;

import com.packt.cardatabase.domain.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
@Service
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
