package com.packt.cardatabase.domain.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long ownerId;

    private String firstName, lastName;

//    @OneToMany(cascade = CascadeType.ALL, mappedBy="owner")
//    private List<Car> cars;

    @JsonIgnore
    @ManyToMany(mappedBy = "owners")
    private Set<Car> cars = new HashSet<>();
    public  Set<Car> getCars() {
        return this.cars;
    }

    public Owner() { }
    public Owner(String firstName, String lastName)
    {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

