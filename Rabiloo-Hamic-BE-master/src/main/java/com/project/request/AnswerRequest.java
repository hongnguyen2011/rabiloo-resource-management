package com.project.request;

import lombok.Data;

@Data
public class AnswerRequest {
    private Long id;
    private String content;
    private int isResult;
    private Long questionId;
}
