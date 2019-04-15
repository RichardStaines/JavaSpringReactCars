package com.packt.cardatabase.websecurity.service;

import io.jsonwebtoken.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;

import static com.packt.cardatabase.websecurity.SecurityConstants.*;


@Service
public class AuthenticationService {

    //Add token to Authorization header
    static public void addToken(HttpServletResponse response, String username)
    {
        String jwtToken = Jwts.builder().setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME
                ))
                .signWith(SignatureAlgorithm.HS512, SIGNING_KEY)
                .compact();
        response.addHeader("Authorization", TOKEN_PREFIX + " " + jwtToken);
        response.addHeader("Access-Control-Expose-Headers", "Authorization");
    }

    static public Authentication getAuthentication(HttpServletRequest request){

        String token = request.getHeader(HEADER_STRING);
        if (token != null)
        {
            String user = Jwts.parser().setSigningKey(SIGNING_KEY)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
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

