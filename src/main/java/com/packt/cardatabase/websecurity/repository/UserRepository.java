package com.packt.cardatabase.websecurity.repository;

import com.packt.cardatabase.websecurity.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
@Service
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
