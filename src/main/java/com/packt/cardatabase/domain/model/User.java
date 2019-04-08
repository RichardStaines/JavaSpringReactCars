package com.packt.cardatabase.domain.model;

import javax.persistence.*;
import com.packt.cardatabase.domain.Utils.PasswordEncrypt;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long id;

    @Column(nullable = false, unique=true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    public String getPassword() {
        return password;
    }
    public String getRole() {
        return role;
    }

    public User() {
    }

    public User(String username, String password, String role)
    {
        super();
        this.username = username;
        this.password = PasswordEncrypt.encrypt(password);
        this.role = role;
    }

}
