package com.project.repository;

import com.project.entity.UserEntity;
import com.project.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	UserEntity findByUserName(String userName);

	Page<UserEntity> findByDeletedFalseAndRoleEquals(Pageable pageable, RoleType userType);

    List<UserEntity> findByDeletedFalse();
}
