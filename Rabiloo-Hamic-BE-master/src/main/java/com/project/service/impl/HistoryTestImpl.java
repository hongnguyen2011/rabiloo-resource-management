package com.project.service.impl;

import com.project.dto.ExamDto;
import com.project.dto.ExamResultDto;
import com.project.dto.HistoryTestDto;
import com.project.dto.UserDto;
import com.project.entity.ExamEntity;
import com.project.entity.ExamResultEntity;
import com.project.entity.UserEntity;
import com.project.response.HistoryTestResponse;
import com.project.service.ExamResultService;
import com.project.service.ExamService;
import com.project.service.HistoryTestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class HistoryTestImpl implements HistoryTestService {


    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ExamResultService examResultService;

    @Autowired
    private ExamService examService;

    @Override
    public HistoryTestResponse findAllByExamId(Long examId, Integer page, Integer size) {
        ExamEntity examEntity = examService.findById(examId);

        HistoryTestResponse response = new HistoryTestResponse();
        if(examEntity == null){
            response.setMessage("Exam not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
            return response;
        }

        Page<ExamResultEntity> pages = examResultService.findByExamsId(examId,page,size);
        var examResultEntities = pages.getContent();

        List<HistoryTestDto> historyTests = new ArrayList<>();
        for (ExamResultEntity examResultEntity : examResultEntities) {
            ExamResultDto examResult = mapper.map(examResultEntity,ExamResultDto.class);
            HistoryTestDto historyTest = new HistoryTestDto();

            UserEntity us = examResultEntity.getUser();
            if(Objects.nonNull(us)) {
                UserDto user = mapper.map(examResultEntity.getUser(), UserDto.class);
                historyTest.setUser(user);
            }

            historyTest.setExamResult(examResult);
            historyTests.add(historyTest);
        }

        response.setDtos(historyTests);
        response.setTotal(pages.getTotalElements());
        response.setCommonTitleExam(examEntity.getTitle());
        response.setMessage("ok");
        response.setStatusCode(HttpStatus.OK);

        return response;
    }

    @Override
    public HistoryTestResponse findAllByUser(Integer page, Integer size) {
        Page<ExamResultEntity> pages = examResultService.findByUser(page,size);

        var examResultEntities = pages.getContent();

        List<HistoryTestDto> historyTests = new ArrayList<>();
        for (ExamResultEntity examResultEntity : examResultEntities) {
            ExamResultDto examResult = mapper.map(examResultEntity,ExamResultDto.class);
            ExamDto exam = mapper.map(examResultEntity.getExam(),ExamDto.class);

            HistoryTestDto historyTest = new HistoryTestDto();
            historyTest.setExamResult(examResult);
            historyTest.setExam(exam);

            historyTests.add(historyTest);
        }

        HistoryTestResponse response = new HistoryTestResponse();
        response.setTotal(pages.getTotalElements());
        response.setDtos(historyTests);
        response.setMessage("ok");
        response.setStatusCode(HttpStatus.OK);

        return response;
    }

    @Override
    public HistoryTestResponse findAll(Integer page, Integer size) {
        Page pages = examService.findAll(page,size);

        List<ExamEntity> examEntities = pages.getContent();

        List<HistoryTestDto> historyTests = new ArrayList<>();
        for (ExamEntity examEntity : examEntities) {
            HistoryTestDto historyTest = new HistoryTestDto();
            historyTest.setExam(examService.toDto(examEntity));

            historyTests.add(historyTest);
        }

        HistoryTestResponse response = new HistoryTestResponse();
        response.setTotal(pages.getTotalElements());
        response.setDtos(historyTests);
        response.setMessage("OK");
        response.setStatusCode(HttpStatus.OK);

        return response;
    }
}
