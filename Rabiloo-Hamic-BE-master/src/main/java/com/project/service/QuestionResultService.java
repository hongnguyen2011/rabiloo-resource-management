package com.project.service;

import com.project.dto.QuestionResultDto;
import com.project.entity.QuestionResultEntity;
import com.project.request.QuestionResultRequest;
import com.project.response.QuestionResultResponse;

import java.util.Collection;
import java.util.List;

public interface QuestionResultService extends BaseService<QuestionResultResponse,QuestionResultRequest>{

    List<QuestionResultDto> saveAll(List<QuestionResultRequest> reqs);

    List<QuestionResultEntity> saveBatch(Collection<QuestionResultEntity> questionResults);

    void save(QuestionResultEntity questionResult);
}
