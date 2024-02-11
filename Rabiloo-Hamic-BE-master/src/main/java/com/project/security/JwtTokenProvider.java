package com.project.security;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtTokenProvider {
	private final String JWT_SECRET = "@hihi2022";
	
	private static final long JWT_EXPIRATION = 10000L * 60 * 60 * 1000; // 10.000h
	
	public String generateToken(UserDetails user) {
		Date now = new Date();
		
		Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
		
		List<String> roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
		
		return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("roles", roles)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
	}
	
	public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }
	
	public String getSubject(String authToken) {
		return parseClaims(authToken).getSubject();
	}
	
	public Claims parseClaims(String authToken) {
		return Jwts.parser()
				.setSigningKey(JWT_SECRET)
				.parseClaimsJws(authToken)
				.getBody();
	}
}
