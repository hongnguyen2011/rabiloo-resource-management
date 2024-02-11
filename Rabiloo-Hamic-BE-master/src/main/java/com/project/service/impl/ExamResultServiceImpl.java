package com.project.service.impl;

import com.project.config.UserAuth;
import com.project.dto.CountExamResultDto;
import com.project.dto.ExamResultDto;
import com.project.entity.*;
import com.project.enums.QuestionType;
import com.project.repository.ExamResultRepository;
import com.project.request.ExamResultFilterRequest;
import com.project.request.ExamResultRequest;
import com.project.request.QuestionResultRequest;
import com.project.response.ExamResultResponse;
import com.project.security.CustomUserDetail;
import com.project.service.*;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ExamResultServiceImpl implements ExamResultService {

    @Autowired
    private UserAuth userAuth;
    @Autowired
    private ExamResultRepository repository;

    @Autowired
    private UserService userService;

    private ExamService examService;
    private QuestionResultService questionResultService;

    @Autowired
    public ExamResultServiceImpl(@Lazy ExamService examService,
                                 @Lazy QuestionResultService questionResultService) {
        this.questionResultService = questionResultService;
        this.examService = examService;
    }

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private AnswerService answerService;


    @Override
    public ExamResultResponse findAll() {
        List<ExamResultEntity> entities = repository.findAll();

        ExamResultResponse response = new ExamResultResponse();
        if (entities.isEmpty()) {
            response.setMessage("Exams not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            List<ExamResultDto> dtos = new ArrayList<>();
            entities.forEach(e -> dtos.add(mapper.map(e, ExamResultDto.class)));

            response.setDtos(dtos);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public ExamResultResponse findOne(Long id) {
        Optional<ExamResultEntity> examResultEntityOptional = repository.findById(id);

        ExamResultResponse response = new ExamResultResponse();
        if (!examResultEntityOptional.isPresent()) {
            response.setMessage("exam not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            ExamResultDto dto = mapper.map(examResultEntityOptional.get(), ExamResultDto.class);
            response.setDto(dto);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public ExamResultResponse create(ExamResultRequest req) {

        ExamResultEntity examResult = new ExamResultEntity();
        ExamResultResponse response = new ExamResultResponse();

        String uuid = UUID.randomUUID().toString();
        examResult.setUuid(uuid);

        ExamEntity exam = examService.findById(req.getExamId());
        if (exam == null) {
            response.setMessage("Exam not found");
            response.setStatusCode(HttpStatus.BAD_REQUEST);
            return response;
        }

        String examCode = exam.getCode();
        String reqCode = req.getCode();

        if (examCode != null) {
            if (reqCode == null || !examCode.equals(reqCode)) {
                response.setMessage("not matching code");
                response.setStatusCode(HttpStatus.BAD_REQUEST);
                return response;
            }
        }
        examResult.setExam(exam);

        UserEntity user = userAuth.getCurrent();
        if (user != null) {
            examResult.setUser(user);
        }

        examResult.setStart(new Date());
        examResult.setPoints(0);
        examResult.setSubmitted(false);

        try {
            ExamResultDto examResultDto = mapper.map(repository.save(examResult), ExamResultDto.class);
            examResultDto.setExamId(exam.getId());
            response.setDto(examResultDto);
            response.setStatusCode(HttpStatus.OK);
            response.setMessage("OK");
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.BAD_REQUEST);
            response.setMessage("Exception");
            throw e;
        }

        return response;
    }

    @Override
    public ExamResultResponse update(ExamResultRequest req) {
        /*Optional<ExamResultEntity> examResultEntityOptional = repository.findById(req.getId());

        ExamResultResponse response = new ExamResultResponse();
        if(!examResultEntityOptional.isPresent()){
            response.setMessage("Exam result is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
            return response;
        }

        if(req.getUserId() != null){
            if(!req.getUserId().equals(examResultEntityOptional.get().getUser().getId())){
                response.setMessage("User is not true");
                response.setStatusCode(HttpStatus.NOT_FOUND);
                return response;
            }
        }

        return save(req);*/

        return null;
    }

    private ExamResultResponse save(ExamResultRequest req) {
        ExamEntity examEntity = examService.findById(req.getExamId());

        ExamResultResponse response = new ExamResultResponse();
        if (examEntity == null) {
            response.setMessage("exam is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
            return response;
        }

        ExamResultEntity entity = mapper.map(req, ExamResultEntity.class);
        entity.setExam(examEntity);

        if (req.getUserId() != null) {
            Optional<UserEntity> userEntityOptional = userService.findById(req.getUserId());
            if (!userEntityOptional.isPresent()) {
                response.setMessage("User is not true");
                response.setStatusCode(HttpStatus.NOT_FOUND);
                return response;
            }
            entity.setUser(userEntityOptional.get());
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String userName = ((CustomUserDetail) authentication.getPrincipal()).getUsername();
            entity.setUser(userService.findByUserName(userName));
        }


        ExamResultDto dto = mapper.map(repository.save(entity), ExamResultDto.class);
        response.setDto(dto);
        response.setMessage("OK");
        response.setStatusCode(HttpStatus.OK);

        return response;
    }

    @Override
    public ExamResultResponse delete(Long id) {
        Optional<ExamResultEntity> optional = repository.findById(id);

        ExamResultResponse response = new ExamResultResponse();
        if (!optional.isPresent()) {
            response.setMessage("Exam is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            ExamResultEntity entity = optional.get();
            entity.setDeleted(true);
            ExamResultDto dto = mapper.map(repository.save(entity), ExamResultDto.class);

            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public Optional<ExamResultEntity> findById(Long id) {
        return repository.findById(id);
    }

    public ExamResultResponse submit(ExamResultRequest request) {
        Optional<ExamResultEntity> examResultEntityOptional = repository.findById(request.getId());
        ExamResultResponse response = new ExamResultResponse();
        if (examResultEntityOptional.isEmpty()) {
            response.setMessage("exam is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
            return response;
        }

        ExamResultEntity examResult = examResultEntityOptional.get();

        Long examId = request.getExamId();
        ExamEntity exam = examService.findAllInfoExamById(examId);

        var mapQuesById = exam.getQuestions()
                .stream()
                .collect(Collectors.toMap(QuestionEntity::getId, Function.identity()));

        var questionResults = request.getQuestionResultRequests()
                .stream()
                .map(req -> createQuestResult(req, mapQuesById))
                .collect(Collectors.toList());
        questionResults.forEach(q -> {
            q.setExamResult(examResult);
            q.setUuidExam(examResult.getUuid());
        });

        int pointsResult = questionResults.stream().mapToInt(QuestionResultEntity::getPoint).sum();
        examResult.setPoints(pointsResult);
        examResult.setEnd(new Date());
        examResult.setSubmitted(true);
        questionResultService.saveBatch(questionResults);

        //todo
        ExamResultDto examResultDto = mapper.map(repository.save(examResult), ExamResultDto.class);
        response.setDto(examResultDto);
        response.setMessage("OK");
        response.setStatusCode(HttpStatus.OK);
        return response;
    }

    private QuestionResultEntity createQuestResult(QuestionResultRequest req, Map<Long, QuestionEntity> mapQuesById) {
        QuestionEntity question = mapQuesById.get(req.getQuestionId());
        if (QuestionType.FILL.equals(question.getType())) {
            return createQuestionResultCaseFill(question, req);
        } else {
            return createQuestionResultCaseSelectType(question, req);
        }
    }

    private QuestionResultEntity createQuestionResultCaseFill(QuestionEntity question, QuestionResultRequest request) {
        QuestionResultEntity questionResult = new QuestionResultEntity();
        questionResult.setQuestion(question);
        List<String> results;
        List<AnswerEntity> answers = question.getAnswers();
        if (answers == null || answers.isEmpty()) {
            results = new ArrayList<>();
        } else {
            results = List.of(answers.get(0).getContent().trim().split(","));
        }
        boolean isAnswerRight = results.contains(request.getContent());
        if (isAnswerRight) {
            questionResult.setPoint(question.getMaxPoint());
        } else {
            questionResult.setPoint(0);
        }
        questionResult.setContent(request.getContent());

        return questionResult;
    }

    private QuestionResultEntity createQuestionResultCaseSelectType(QuestionEntity question,
                                                                    QuestionResultRequest request) {
        QuestionResultEntity questionResult = new QuestionResultEntity();

        // set question
        questionResult.setQuestion(question);

        // set answers
        var listAnsIdsOfUser = request.getAnswerIds();
        List<AnswerEntity> answers = question.getAnswers().stream()
                .filter(ans -> listAnsIdsOfUser != null && listAnsIdsOfUser.contains(ans.getId()))
                .collect(Collectors.toList());

        questionResult.setAnswers(answers);

        // calculate points
        List<Long> rightAnswerIds = question.getAnswers().stream()
                .filter(ans -> ans.getIsResult() == 1)
                .map(AnswerEntity::getId)
                .collect(Collectors.toList());

        boolean isUserAnswerRight = new HashSet<>(listAnsIdsOfUser).containsAll(rightAnswerIds)
                && new HashSet<>(rightAnswerIds).containsAll(listAnsIdsOfUser);
        if (isUserAnswerRight) {
            questionResult.setPoint(question.getMaxPoint());
        } else {
            questionResult.setPoint(0);
        }

        return questionResult;
    }


    @Override
    public ExamResultResponse findExamsByParamNative(ExamResultFilterRequest req) {
        List<ExamResultEntity> entities = repository.findExamResultsByParamNative(req.getExamId(),
                req.getMinPoint(), req.getMaxPoint(), req.getLongTime());

        ExamResultResponse response = new ExamResultResponse();
        if (entities.isEmpty()) {
            response.setMessage("List is empty");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            List<ExamResultDto> dtos = new ArrayList<>();
            entities.forEach(e -> dtos.add(mapper.map(e, ExamResultDto.class)));

            response.setDtos(dtos);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public Page<ExamResultEntity> findByUser(Integer page, Integer size) {
        UserEntity user = userAuth.getCurrent();

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("end").descending());
        Page<ExamResultEntity> pages = repository.findBySubmittedTrueAndUser_Id(user.getId(), pageable);

        return pages;
    }

    @Override
    public Page<ExamResultEntity> findByExamsId(Long examId, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("end").descending());
        Page<ExamResultEntity> pages = repository.findBySubmittedTrueAndExam_Id(examId, pageable);

        return pages;
    }

    @Override
    public List<CountExamResultDto> count() {
        return repository.countExamResults();
    }

}
