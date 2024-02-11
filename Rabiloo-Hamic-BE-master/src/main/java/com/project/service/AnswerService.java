package com.project.service;

import com.project.dto.AnswerDto;
import com.project.entity.AnswerEntity;
import com.project.entity.QuestionEntity;
import com.project.request.AnswerRequest;
import com.project.response.AnswerResponse;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface AnswerService extends BaseService<AnswerResponse, AnswerRequest>{

    List<AnswerEntity> findByQuestionIn(List<QuestionEntity> questions);

 /*   List<AnswerEntity> findByQuestionIdIn(List<Long> questionIds);*/

    Optional<AnswerEntity> findById(Long id);

    List<AnswerEntity> findAllById(List<Long> ids);

    List<AnswerEntity> findByQuestion(QuestionEntity question);

    List<AnswerDto> saveAll(QuestionEntity questionEntity, List<AnswerRequest> requests);

    void saveAllToDB(Collection<AnswerEntity> answers);
}
