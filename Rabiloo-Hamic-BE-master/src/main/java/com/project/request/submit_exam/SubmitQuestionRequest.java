package com.project.request.submit_exam;

import lombok.Data;

import java.util.List;

@Data
public class SubmitQuestionRequest {
    private Long questionId;
    private List<Long> answerIds;
    private String answerWithText;
}
