package com.project.repository;

import com.project.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity,Long> {
    List<NotificationEntity> findByDeletedFalse();
    NotificationEntity findByIdAndDeletedFalse(Long id);
}
