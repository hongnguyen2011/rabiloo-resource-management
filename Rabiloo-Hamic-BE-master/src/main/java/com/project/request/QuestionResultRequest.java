package com.project.request;

import com.project.enums.QuestionType;
import lombok.Data;

import java.util.List;

@Data
public class QuestionResultRequest {
    private Long id;
    private String content; // dien text
    private QuestionType type;
    private Integer point;
    private Long questionId;
    private Long userId;
    private Long examId;
    private Long examResultId;
    private List<Long> answerIds;
}
