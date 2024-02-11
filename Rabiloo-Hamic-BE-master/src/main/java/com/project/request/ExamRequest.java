package com.project.request;

import lombok.Data;

@Data
public class ExamRequest {
    private Long id;
    private String title;
    private String description;
    private String type;
    private String code;
    private Long startFrom;
    private Long endTo;
    private Integer totalTime;
}
