package com.project.repository;

import com.project.entity.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entity.QuestionEntity;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<AnswerEntity, Long>{

    List<AnswerEntity> findByQuestionInAndDeletedFalse(List<QuestionEntity> questions);

    List<AnswerEntity> findByQuestion(QuestionEntity question);

}
