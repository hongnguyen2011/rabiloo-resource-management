package com.project.dto;

import lombok.Data;

@Data
public class CountExamResultDto {
    private Long total;
    private Long examId;

    public CountExamResultDto(Long total, Long examId) {
        this.total = total;
        this.examId = examId;
    }

    public CountExamResultDto(){

    }
}
