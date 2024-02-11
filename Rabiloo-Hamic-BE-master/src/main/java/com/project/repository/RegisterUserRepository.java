package com.project.repository;

import com.project.entity.RegisterUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterUserRepository extends JpaRepository<RegisterUser, Long> {
    Optional<RegisterUser> findByEmailAndRegisterCode(String email, String code);
}
