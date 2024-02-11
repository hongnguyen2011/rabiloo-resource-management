package com.project.service.impl;

import com.project.dto.QuestionResultDto;
import com.project.entity.AnswerEntity;
import com.project.entity.ExamResultEntity;
import com.project.entity.QuestionEntity;
import com.project.entity.QuestionResultEntity;
import com.project.enums.QuestionType;
import com.project.repository.QuestionResultRepository;
import com.project.request.QuestionResultRequest;
import com.project.response.QuestionResultResponse;
import com.project.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionResultServiceImpl implements QuestionResultService {

    @Autowired
    private QuestionResultRepository repository;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;


    private ExamResultService examResultService;

    @Autowired
    public QuestionResultServiceImpl(@Lazy ExamResultService examResultService) {
        this.examResultService = examResultService;
    }

    @Autowired
    private AnswerService answerService;

    @Autowired
    private ModelMapper mapper;

    @Override
    public QuestionResultResponse findAll() {
        List<QuestionResultEntity> entities = repository.findAll();

        QuestionResultResponse response = new QuestionResultResponse();
        if (entities.isEmpty()) {
            response.setMessage("answers is null");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            List<QuestionResultDto> dtos = new ArrayList<>();
            entities.forEach(e -> dtos.add(mapper.map(e, QuestionResultDto.class)));

            response.setDtos(dtos);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public QuestionResultResponse findOne(Long id) {
        Optional<QuestionResultEntity> questionResultEntityOptional = repository.findById(id);

        QuestionResultResponse response = new QuestionResultResponse();
        if (!questionResultEntityOptional.isPresent()) {
            response.setMessage("answer not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            QuestionResultDto dto = mapper.map(questionResultEntityOptional.get(), QuestionResultDto.class);
            response.setDto(dto);
            response.setMessage("ok");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public QuestionResultResponse create(QuestionResultRequest req) {
        return save(req);
    }

    @Override
    public QuestionResultResponse update(QuestionResultRequest req) {
        Optional<QuestionResultEntity> questionResultEntityOptional = repository.findById(req.getId());
        if (!questionResultEntityOptional.isPresent()) {
            QuestionResultResponse response = new QuestionResultResponse();
            response.setStatusCode(HttpStatus.NOT_FOUND);
            response.setMessage("Answer is not found");
            return response;
        }

        return save(req);
    }

    private QuestionResultResponse save(QuestionResultRequest req) {
        /*Optional<ExamResultEntity> examResultEntityOptional = examResultService.findById(req.getExamResultId());
        if (!examResultEntityOptional.isPresent()) {
            return new ResponseEntity<>("exam result not found", HttpStatus.NOT_FOUND);
        }
        QuestionResultEntity entity = mapper.map(req,QuestionResultEntity.class);
        entity.setExamResult(examResultEntityOptional.get());

        Optional<QuestionEntity> questionEntityOptional  = questionService.findById(req.getQuestionId());
        if (!questionEntityOptional.isPresent()) {
            return new ResponseEntity<>("question not found", HttpStatus.NOT_FOUND);
        }

        if (!questionEntityOptional.get().getExam().getId().equals(req.getExamId())) {
            return new ResponseEntity<>("question not in this exam", HttpStatus.NOT_FOUND);
        }
        entity.setQuestion(questionEntityOptional.get());

        // check type of question: Select
        if (req.getType().equals(QuestionType.SELECT)){
            if (req.getAnswerId() == null)
                return new ResponseEntity<>("answers null",HttpStatus.BAD_REQUEST);

            List<AnswerEntity> answers = answerService.findAllById(req.getAnswerId());
            if (answers.isEmpty()){
                return new ResponseEntity<>("answer not found", HttpStatus.NOT_FOUND);
            }
            // check per answer is matched with this question
            for (AnswerEntity answer : answers) {
                if(!answer.getQuestion().getId().equals(req.getQuestionId()))
                    return new ResponseEntity<>("answer not in this question", HttpStatus.BAD_REQUEST);
            }
            entity.setAnswers(Sets.newHashSet(answers));
        }

        if (req.getUserId() != null) {
            Optional<UserEntity> userEntityOptional = userService.findById(req.getUserId());
            if(!userEntityOptional.isPresent()){
                return new ResponseEntity<>("user not found", HttpStatus.NOT_FOUND);
            }
            entity.setUser(userEntityOptional.get());
        }

        QuestionResultDto dto = mapper.map(repository.save(entity),QuestionResultDto.class);

        return new ResponseEntity<>(dto,HttpStatus.OK);*/

        return null;
    }

    @Override
    public QuestionResultResponse delete(Long id) {
        Optional<QuestionResultEntity> optional = repository.findById(id);

        QuestionResultResponse response = new QuestionResultResponse();
        if (!optional.isPresent()) {
            response.setMessage("Answer is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            QuestionResultEntity entity = optional.get();
            entity.setDeleted(true);
            repository.save(entity);

            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public List<QuestionResultDto> saveAll(List<QuestionResultRequest> reqs) {

        List<QuestionResultEntity> entities = new ArrayList<>();
        if (reqs == null || CollectionUtils.isEmpty(reqs)) {
            return null;
        }

        Long examResultId = reqs.get(0).getExamResultId();
        Optional<ExamResultEntity> examResultEntityOptional = examResultService.findById(examResultId);
        if (!examResultEntityOptional.isPresent()) {
            throw new RuntimeException("Exam result not found");
        }

        ExamResultEntity examResult = examResultEntityOptional.get();

        for (QuestionResultRequest req : reqs) {
            QuestionResultEntity questionResult = mapper.map(req, QuestionResultEntity.class);
            questionResult.setExamResult(examResult);

            Optional<QuestionEntity> questionEntityOptional = questionService.findById(req.getQuestionId());
            if (!questionEntityOptional.isPresent()) {
                throw new RuntimeException("question not found");
            }

            QuestionEntity questionEntity = questionEntityOptional.get();
            if (!questionEntity.getExam().getId().equals(req.getExamId())) {
                throw new RuntimeException("question not in this exam");
            }

            questionResult.setQuestion(questionEntity);

            // check type of question: Select
            if (req.getType().equals(QuestionType.SELECT) || req.getType().equals(QuestionType.MULTIPLE_SELECT)) {
                if (req.getAnswerIds() == null) {
                    throw new RuntimeException("answers null");
                }

                List<AnswerEntity> answers = answerService.findAllById(req.getAnswerIds());
                if (answers.isEmpty()) {
                    throw new RuntimeException("answer not found");
                }

                // check per answer is matched with this question
                /*for (AnswerEntity answer : answers) {
                    if (!answer.getQuestion().getId().equals(req.getQuestionId())) {
                        throw new RuntimeException("answer not in this question");
                    }
                }*/
                questionResult.setAnswers(answers);

                // calculate point and set
                questionResult.setPoint(calculatePoint(answers));

                entities.add(questionResult);
            }
        }

        List<QuestionResultEntity> questionResults = repository.saveAll(entities);

        List<QuestionResultDto> dtos = new ArrayList<>();
        questionResults.forEach(e -> dtos.add(mapper.map(e, QuestionResultDto.class)));

        return dtos;
    }

    @Override
    public List<QuestionResultEntity> saveBatch(Collection<QuestionResultEntity> questionResults) {
        return repository.saveAll(questionResults);
    }

    @Override
    public void save(QuestionResultEntity questionResult) {
        repository.save(questionResult);
    }

    private Integer calculatePoint(List<AnswerEntity> answers) {
        for (AnswerEntity answer : answers) {
            if(answer.getIsResult() == 0){
                return 0;
            }
        }
        return 10;
    }
}

