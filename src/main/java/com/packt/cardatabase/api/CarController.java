package com.packt.cardatabase.api;

import com.packt.cardatabase.domain.model.Car;
import com.packt.cardatabase.domain.repository.CarRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController {

    private final CarRepository carRepository;

    public CarController(final CarRepository carRepository)
    {
        this.carRepository = carRepository;
    }

    @RequestMapping("/cars")
    public Iterable<Car> getCars()
    {
        return carRepository.findAll();
    }

}
