package com.project.security;

import com.project.entity.UserEntity;
import com.project.enums.RoleType;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter{

	@Autowired
    private JwtTokenProvider tokenProvider;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if(!hasAuthorizationBearer(request)) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String jwt = getJwt(request);
		boolean isAuthen = !tokenProvider.validateToken(jwt);
		if(!tokenProvider.validateToken(jwt)) {
			filterChain.doFilter(request, response);
			return;
		}
		
		setAuthenticatonContext(jwt, request);
		filterChain.doFilter(request, response);
	}
	
	private boolean hasAuthorizationBearer(HttpServletRequest request) {
		String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(ObjectUtils.isEmpty(bearerToken) || !bearerToken.startsWith("Bearer"))
			return false;
		
		return true;
	}
	
	private String getJwt(HttpServletRequest request) {
		String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
			return bearerToken.substring(7);
		}
		return null;
	}
	
	private void setAuthenticatonContext(String jwt, HttpServletRequest request) {
		UserDetails userDetails = getUserDetails(jwt);
		
		UsernamePasswordAuthenticationToken
        	authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
	
	private UserDetails getUserDetails(String jwt) {
		UserEntity user = new UserEntity();
		Claims claims = tokenProvider.parseClaims(jwt);

		// set role
		List<String> roleList = (List<String>) claims.get("roles");

		String role = roleList.get(0);
		user.setRole(RoleType.valueOf(role));

		//get user name and set that
		String subject = (String) claims.get(Claims.SUBJECT);
		user.setUserName(subject);
		
		return new CustomUserDetail(user);
	}


}
