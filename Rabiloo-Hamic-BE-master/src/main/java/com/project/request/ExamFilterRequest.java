package com.project.request;

import lombok.Data;

@Data
public class ExamFilterRequest {
    private String code;
    private String title;
    private String start;
    private String end;
}
