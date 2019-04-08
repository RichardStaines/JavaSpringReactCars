package com.packt.cardatabase.domain.service;

import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;

@Service
public class AuthenticationService {

    static final long EXPIRATIONTIME = 864_000_00; // 1 day in ms
    static final String SIGNINGKEY = "SecretKey";
    static final String PREFIX = "Bearer";

    //Add token to Authorization header
    static public void addToken(HttpServletResponse response, String username)
    {
        String jwtToken = Jwts.builder().setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME
                ))
                .signWith(SignatureAlgorithm.HS512, SIGNINGKEY)
                .compact();
        response.addHeader("Authorization", PREFIX + " " + jwtToken);
        response.addHeader("Access-Control-Expose-Headers", "Authoraization");
    }

    static public Authentication getAuthentication(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token != null)
        {
            String user = Jwts.parser().setSigningKey(SIGNINGKEY)
                    .parseClaimsJws(token.replace(PREFIX, ""))
                    .getBody()
                    .getSubject();
            if (user != null)
            {
                return new UsernamePasswordAuthenticationToken(
                        user, null, Collections.emptyList());
            }
        }
        return null;
    }
}
