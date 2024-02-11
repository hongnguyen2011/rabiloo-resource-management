package com.project.repository;

import com.project.entity.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<MediaEntity, Long>{
    List<MediaEntity> findByQuestion_IdAndDeletedFalse(Long questionId);
}
