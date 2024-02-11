package com.project.service;

import com.project.entity.ExamEntity;
import com.project.entity.QuestionEntity;
import com.project.request.QuestionRequest;
import com.project.response.QuestionResponse;

import java.util.List;
import java.util.Optional;

public interface QuestionService extends BaseService<QuestionResponse,QuestionRequest>{
    Optional<QuestionEntity> findById(Long id);

    List<QuestionEntity> findByExam(ExamEntity exam);

    void saveAll(List<QuestionEntity> questions);
}
