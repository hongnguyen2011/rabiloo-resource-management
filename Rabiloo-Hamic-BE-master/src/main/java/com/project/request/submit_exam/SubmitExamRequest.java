package com.project.request.submit_exam;

import lombok.Data;

import java.util.List;

@Data
public class SubmitExamRequest {
    private String uuid;
    private Long userId;
    private Long examResultId;
    private List<SubmitQuestionRequest> submitQuestionRequests;
}
