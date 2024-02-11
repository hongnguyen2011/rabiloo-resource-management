package com.project.service.impl;

import com.project.dto.AnswerDto;
import com.project.dto.QuestionDto;
import com.project.entity.AnswerEntity;
import com.project.entity.ExamEntity;
import com.project.entity.MediaEntity;
import com.project.entity.QuestionEntity;
import com.project.repository.QuestionRepository;
import com.project.request.AnswerRequest;
import com.project.request.MediaRequest;
import com.project.request.QuestionRequest;
import com.project.response.QuestionResponse;
import com.project.service.AnswerService;
import com.project.service.ExamService;
import com.project.service.MediaService;
import com.project.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository repository;

    private ExamService examService;

    private AnswerService answerService;

    private MediaService mediaService;

    @Autowired
    public QuestionServiceImpl(@Lazy ExamService examService,
                               @Lazy AnswerService answerService,
                               @Lazy MediaService mediaService) {
        this.examService = examService;
        this.answerService = answerService;
        this.mediaService = mediaService;
    }

    @Autowired
    private ModelMapper mapper;

    @Override
    public QuestionResponse findAll() {
        List<QuestionEntity> entities = repository.findAll();

        QuestionResponse response = new QuestionResponse();
        if (entities.isEmpty()) {
            response.setMessage("questions is empty");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            List<QuestionDto> dtos = new ArrayList<>();
            entities.forEach(e -> dtos.add(mapper.map(e, QuestionDto.class)));

            response.setDtos(dtos);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }


        return response;
    }

    @Override
    public QuestionResponse findOne(Long id) {
        QuestionEntity entity = repository.findByIdAndDeletedFalse(id);

        QuestionResponse response = new QuestionResponse();
        if (entity != null) {
            response.setMessage("question not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            QuestionDto dto = mapper.map(entity, QuestionDto.class);

            response.setDto(dto);
            response.setMessage("ok");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public QuestionResponse create(QuestionRequest req) {
        return save(req);
    }

    @Override
    public QuestionResponse update(QuestionRequest req) {
        Optional<QuestionEntity> questionEntityOptional = repository.findById(req.getId());
        if (!questionEntityOptional.isPresent()) {
            QuestionResponse response = new QuestionResponse();
            response.setStatusCode(HttpStatus.NOT_FOUND);
            response.setMessage("Question is not found");
            return response;
        }

        return save(req);
    }

    private QuestionResponse save(QuestionRequest req) {
        ExamEntity exam = examService.findById(req.getExamId());

        QuestionResponse response = new QuestionResponse();
        if (exam == null) {
            response.setMessage("question is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {

            // save question
            QuestionEntity question = mapper.map(req, QuestionEntity.class);
            question.setMaxPoint(10);
            question.setExam(exam);
            QuestionDto questionDto = mapper.map(repository.save(question), QuestionDto.class);

            // delete old answers which not use
            Set<Long> nonDeleteAnswer = req.getAnswers().stream().map(AnswerRequest::getId)
                    .filter(Objects::nonNull).collect(Collectors.toSet());
            List<AnswerEntity> answers = answerService.findByQuestion(question);
            answers.removeIf(ans -> nonDeleteAnswer.contains(ans.getId()));
            answers.forEach(ans -> ans.setDeleted(true));
            answerService.saveAllToDB(answers);

            // save new answers
            List<AnswerDto> answerDtos = answerService.saveAll(question, req.getAnswers());
            questionDto.setAnswers(answerDtos);

            //set deleted = true for old medias
            List<MediaEntity> oldMedias = mediaService.findByQuestionId(req.getId());
            if (oldMedias != null) {
                mediaService.deleteAll(oldMedias);
            }

            //set new medias
            List<MediaRequest> mediaRequests = req.getImages();
            if (mediaRequests != null) {
                List<MediaEntity> newMedias = new ArrayList<>();
                for (MediaRequest mediaRequest : mediaRequests) {
                    MediaEntity newMedia = mapper.map(mediaRequest, MediaEntity.class);
                    newMedia.setQuestion(question);
                    newMedias.add(newMedia);
                }
                questionDto.setImages(mediaService.saveAll(newMedias));
            }


            response.setDto(questionDto);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public QuestionResponse delete(Long id) {
        Optional<QuestionEntity> optional = repository.findById(id);

        QuestionResponse response = new QuestionResponse();
        if (!optional.isPresent()) {
            response.setMessage("Question is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            QuestionEntity entity = optional.get();
            entity.setDeleted(true);
            repository.save(entity);

            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }


    @Override
    public Optional<QuestionEntity> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<QuestionEntity> findByExam(ExamEntity exam) {
        return repository.findByExamAndDeletedFalse(exam);
    }

    @Override
    public void saveAll(List<QuestionEntity> questions) {

    }

}
