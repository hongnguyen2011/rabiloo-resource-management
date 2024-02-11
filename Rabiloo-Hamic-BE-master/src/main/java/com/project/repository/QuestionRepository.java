package com.project.repository;

import com.project.entity.ExamEntity;
import com.project.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long>{
    List<QuestionEntity> findByExamAndDeletedFalse(ExamEntity exam);
    QuestionEntity findByIdAndDeletedFalse(Long id);

}
