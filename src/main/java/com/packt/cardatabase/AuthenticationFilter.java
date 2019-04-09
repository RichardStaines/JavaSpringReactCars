package com.packt.cardatabase;

 import com.packt.cardatabase.websecurity.LoginFilter;
import com.packt.cardatabase.websecurity.service.AuthenticationService;
 import io.jsonwebtoken.Jwts;
 import org.springframework.security.authentication.AuthenticationManager;
 import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
 import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
 import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
 import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import java.io.IOException;
 import java.util.ArrayList;
 import java.util.Collections;

 import static com.packt.cardatabase.websecurity.SecurityConstants.*;


public class AuthenticationFilter extends BasicAuthenticationFilter {

    AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {

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

