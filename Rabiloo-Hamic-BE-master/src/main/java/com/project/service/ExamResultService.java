package com.project.service;

import com.project.dto.CountExamResultDto;
import com.project.entity.ExamResultEntity;
import com.project.request.ExamResultFilterRequest;
import com.project.request.ExamResultRequest;
import com.project.response.ExamResultResponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ExamResultService extends BaseService<ExamResultResponse,ExamResultRequest> {
    Optional<ExamResultEntity> findById(Long id);

    ExamResultResponse submit(ExamResultRequest req);

    ExamResultResponse findExamsByParamNative(ExamResultFilterRequest req);

    Page<ExamResultEntity> findByUser(Integer page, Integer size);

    Page<ExamResultEntity> findByExamsId(Long examId, Integer page, Integer size);

    List<CountExamResultDto> count();


}
