package com.project.service;

import com.project.response.HistoryTestResponse;

public interface HistoryTestService {
    HistoryTestResponse findAllByExamId(Long examId,Integer page, Integer size);

    HistoryTestResponse findAllByUser(Integer page, Integer size);

    HistoryTestResponse findAll(Integer page, Integer size);
}
