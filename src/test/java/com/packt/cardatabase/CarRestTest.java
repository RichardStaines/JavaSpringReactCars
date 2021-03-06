package com.packt.cardatabase;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations="classpath:test.properties")
public class CarRestTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGoodAuthentication() throws Exception
    {
        // Test with correct credentials
        this.mockMvc.perform(post("/login")
                .content("{\"username\": \"admin\" , \"password\":\"admin\" }"))
                .andDo(print()).andExpect(status().isOk());
    }

    @Test
    public void testBadAuthentication() throws Exception
    {
        // Test with correct credentials
        this.mockMvc.perform(post("/login")
                .content("{\"username\": \"admin\" , \"password\":\"wrong\" }"))
                .andDo(print()).andExpect(status().is4xxClientError());
    }

    @Test
    public void testAddCar() throws Exception
    {
        // Test with correct credentials
        this.mockMvc.perform(post("/cars")
                .content("{\"brand\": \"Fiat\" , \"model\":\"Uno\", \"colour\":\"red\", \"registrationNumber\":\"xxx111\"  }"))
                .andDo(print()).andExpect(status().isOk());
    }

}
