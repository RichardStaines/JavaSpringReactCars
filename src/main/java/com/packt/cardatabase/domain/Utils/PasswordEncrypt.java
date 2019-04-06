package com.packt.cardatabase.domain.Utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncrypt {

    static public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    static public String encrypt(String password) {
        String ENCODED_PASSWORD = passwordEncoder()
                .encode(password);
        return ENCODED_PASSWORD;
    }

}
