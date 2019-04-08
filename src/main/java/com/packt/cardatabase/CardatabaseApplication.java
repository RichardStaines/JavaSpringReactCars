package com.packt.cardatabase;

import com.packt.cardatabase.domain.Utils.PasswordEncrypt;
import com.packt.cardatabase.domain.model.Owner;
import com.packt.cardatabase.domain.model.User;
import com.packt.cardatabase.domain.repository.OwnerRepository;
import com.packt.cardatabase.domain.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.packt.cardatabase.domain.model.Car;
import com.packt.cardatabase.domain.repository.CarRepository;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static org.springframework.boot.SpringApplication.*;

@SpringBootApplication
public class CardatabaseApplication {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger =
            LoggerFactory.getLogger(CardatabaseApplication.class);

    public static void main(String[] args) {
        run(CardatabaseApplication.class, args);
        logger.info("Hello Spring Boot");
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {

            // never do this in real life i.e. leaving unecrypted password in code.
     //       this.userRepository.save(new User("admin","admin", "ADMIN" ));
     //       this.userRepository.save(new User("user", "password123", "USER"));
/*
            Owner owner1 = new Owner("John", "Johnson");
            Owner owner2 = new Owner("Harriette", "Hodgson");
            ownerRepository.save(owner1);
            ownerRepository.save(owner2);

            Set<Owner> ownerSet1 = new HashSet<>(Arrays.asList(owner1));
            Set<Owner> ownerSet2 = new HashSet<>(Arrays.asList(owner2));
            Set<Owner> ownerSet3 = new HashSet<>(Arrays.asList(owner1, owner2));

            // save demo data to DB
            carRepository.save(
                    new Car("Ford", "Mustang", "Red",
                            "ADF-1121", "1975", 56000,
                            owner1
                    )
            );
            carRepository.save(
                    new Car("MG", "new-3", "Black",
                            "ZZZ-999", "2009", 21000,
                            owner2
                    )
            );
            carRepository.save(
                    new Car("Mazda", "6 Estate", "Blue",
                            "CF99-FAN", "2013", 19000,
                            owner1, owner2
                    )
            );
            */
        };
    }


}
