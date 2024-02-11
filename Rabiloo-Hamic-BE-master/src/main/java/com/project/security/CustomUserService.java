package com.project.security;

import com.project.entity.UserEntity;
import com.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserService implements UserDetailsService{
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = userRepository.findByUserName(username);
        if(user==null){
            throw new UsernameNotFoundException("User " + username + " was not found in the database");
        }
        return new CustomUserDetail(user);
	}
	
	public UserDetails loadUserById(Long id) {
		UserEntity user = userRepository.findById(id).orElseThrow(
				() -> new UsernameNotFoundException("Not found by id: "+ id));
		return new CustomUserDetail(user);
	}
}
