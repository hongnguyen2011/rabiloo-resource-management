package com.project.request;

import lombok.Data;

@Data
public class ExamResultFilterRequest {
    private Long examId;
    private Integer minPoint;
    private Integer maxPoint;
    private Integer longTime; // request sec
}
