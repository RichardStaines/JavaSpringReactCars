package com.packt.cardatabase.domain.model;

import javax.persistence.*;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Data
@EqualsAndHashCode(exclude = "owners")

public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long id;

    private String brand, model, colour, registrationNumber, year;
    private int price;

//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name="owner")
//    private Owner owner;

    @ManyToMany(cascade =  CascadeType.MERGE)
    @JoinTable(name = "car_owner", joinColumns= { @JoinColumn(name="id")},
            inverseJoinColumns = { @JoinColumn(name="ownerId")}
    )
    private Set<Owner> owners = new HashSet<Owner>(0);

//    @Column(name="desc", nullable=false,length=512)
//    private String description;

    public Car() {}

    public Car (String brand, String model, String colour,
                String registrationNumber, String year, int price,
                Owner... owners
    ) {
        super();
        this.brand = brand;
        this.model = model;
        this.colour = colour;
        this.registrationNumber = registrationNumber;
        this.year = year;
        this.price = price;

        this.owners = Stream.of(owners).collect(Collectors.toSet());

    }

}
