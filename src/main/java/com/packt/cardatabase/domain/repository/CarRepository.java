package com.packt.cardatabase.domain.repository;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.packt.cardatabase.domain.model.Car;
import org.springframework.stereotype.Service;

@Service
public interface CarRepository extends CrudRepository <Car, Long> {

    List<Car> findByBrand(String brand);

    List<Car> findByColour(String colour);

    List<Car> findByYear(int year);

    List<Car> findByBrandAndModel(String brand, String model);

    List<Car> findByBrandOrColour(String brand, String colour);

    List<Car> findByBrandOrderByYearAsc(String brand);

    @Query("select c from Car c where c.brand like %?1")
    List<Car> findByBrandEndsWith(String brand);
}
