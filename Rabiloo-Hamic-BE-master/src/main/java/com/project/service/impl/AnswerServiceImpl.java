package com.project.service.impl;

import com.project.dto.AnswerDto;
import com.project.entity.AnswerEntity;
import com.project.entity.QuestionEntity;
import com.project.repository.AnswerRepository;
import com.project.request.AnswerRequest;
import com.project.response.AnswerResponse;
import com.project.service.AnswerService;
import com.project.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository repository;

    private QuestionService questionService;
    @Autowired
    public AnswerServiceImpl(@Lazy QuestionService questionService){
        this.questionService = questionService;
    }

    @Autowired
    private ModelMapper mapper;


    @Override
    public AnswerResponse findAll() {
        List<AnswerEntity> entities = repository.findAll();
        AnswerResponse response = new AnswerResponse();
        if (entities.isEmpty()) {
            response.setMessage("answers is null");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            List<AnswerDto> dtos = new ArrayList<>();
            entities.forEach(e -> dtos.add(mapper.map(e, AnswerDto.class)));
            response.setDtos(dtos);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public AnswerResponse findOne(Long id) {
        Optional<AnswerEntity> answerEntityOptional = repository.findById(id);

        AnswerResponse response = new AnswerResponse();
        if (!answerEntityOptional.isPresent()) {
            response.setMessage("answer not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            AnswerDto dto = mapper.map(answerEntityOptional.get(), AnswerDto.class);
            response.setDto(dto);
            response.setMessage("ok");
            response.setStatusCode(HttpStatus.OK);
        }
        return response;
    }

    @Override
    public AnswerResponse create(AnswerRequest req) {
        return save(req);
    }


    //TODO update
    private <E> void  preSave(E entity) {
        /* get current user from spring context */
        /* update created user id, updated ... */
        /* call repo save entity */
    }

    private <E> void  preSaveAll(List<E> entities) {
        /* loop entities */
        /* get current user from spring context */
        /* update created user id, updated ... */

        /* call repo save entities */
    }

    @Override
    public AnswerResponse update(AnswerRequest req) {
        Optional<AnswerEntity> answerEntityOptional = repository.findById(req.getId());
        if (!answerEntityOptional.isPresent()) {
            AnswerResponse response = new AnswerResponse();
            response.setStatusCode(HttpStatus.NOT_FOUND);
            response.setMessage("Answer is not found");
            return response;
        }

        return save(req);
    }

    private AnswerResponse save(AnswerRequest req) {
        Optional<QuestionEntity> questionEntityOptional = questionService.findById(req.getQuestionId());
        AnswerResponse response = new AnswerResponse();
        if (!questionEntityOptional.isPresent()) {
            response.setMessage("question is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            AnswerEntity entity = mapper.map(req, AnswerEntity.class);
            entity.setQuestion(questionEntityOptional.get());
            AnswerDto dto = mapper.map(repository.save(entity), AnswerDto.class);

            response.setDto(dto);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }


    @Override
    public AnswerResponse delete(Long id) {
        Optional<AnswerEntity> optional = repository.findById(id);

        AnswerResponse response = new AnswerResponse();
        if (!optional.isPresent()) {
            response.setMessage("Answer is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            AnswerEntity entity = optional.get();
            entity.setDeleted(true);
            AnswerDto dto = mapper.map(repository.save(entity), AnswerDto.class);

            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public List<AnswerEntity> findByQuestionIn(List<QuestionEntity> questions) {
        return repository.findByQuestionInAndDeletedFalse(questions);
    }

    @Override
    public Optional<AnswerEntity> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<AnswerEntity> findAllById(List<Long> ids) {
        return repository.findAllById(ids);
    }

    @Override
    public List<AnswerEntity> findByQuestion(QuestionEntity question) {
        return repository.findByQuestion(question);
    }

    @Override
    public List<AnswerDto> saveAll(QuestionEntity questionEntity,List<AnswerRequest> requests) {
        if(requests == null){
            return new ArrayList<>();
        }
        List<AnswerEntity> entities = new ArrayList<>();
        try {
            for (AnswerRequest request : requests) {
                AnswerEntity entity = mapper.map(request,AnswerEntity.class);
                entity.setQuestion(questionEntity);
                entities.add(entity);
            }

            List<AnswerEntity> answers = repository.saveAll(entities);
            List<AnswerDto> dtos = new ArrayList<>();
            for (AnswerEntity answer : answers) {
                dtos.add(mapper.map(answer, AnswerDto.class));
            }

            return dtos;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public void saveAllToDB(Collection<AnswerEntity> answers) {
        repository.saveAll(answers);
    }


}
