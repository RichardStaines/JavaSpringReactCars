package com.packt.cardatabase;

import com.packt.cardatabase.domain.model.Car;
import com.packt.cardatabase.domain.model.Owner;
import com.packt.cardatabase.domain.repository.CarRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource(locations="classpath:test.properties")
public class CarRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    CarRepository carRepository;

    @Test
    public void saveCar() {
        Owner owner1 = new Owner("Teresa", "Green");
        entityManager.persistAndFlush(owner1);

        Car car = new Car("Tesla", "Model X", "White", "ZZZ-777", "2019", 85000, owner1);
        entityManager.persistAndFlush(car);
        assertThat(car.getId()).isNotNull();
    }

    @Test
    public void saveCarNoOwner() {
        Car car = new Car("Tesla", "Model X", "White", "ZZZ-777", "2019", 85000);
        entityManager.persistAndFlush(car);
        assertThat(car.getId()).isNotNull();
    }

    @Test
    public void deleteCars() {
        Owner owner1 = new Owner("John", "Evans");
        entityManager.persistAndFlush(owner1);

        Car car1 = new Car("Tesla", "Model X", "White", "ZZZ-777", "2019", 85000, owner1);
        Car car2 = new Car("Mini", "Cooper", "Green", "ACE-001", "2017", 30000, owner1);
        entityManager.persistAndFlush(car1);
        entityManager.persistAndFlush(car2);
        carRepository.deleteAll();
        assertThat(carRepository.findAll()).isEmpty();
    }
}
