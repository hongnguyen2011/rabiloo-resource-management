package com.project.config;

import com.project.entity.UserEntity;
import com.project.repository.UserRepository;
import com.project.security.CustomUserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UserAuth {

    @Autowired
    private UserRepository repository;

    public UserEntity getCurrent() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getAuthorities().stream().findFirst().get().getAuthority().equals("ROLE_ANONYMOUS")
                || authentication == null
                || !authentication.isAuthenticated())
        {
            return null;
        }

        String userName = ((CustomUserDetail) authentication.getPrincipal()).getUsername();

        return repository.findByUserName(userName);
    }
}
