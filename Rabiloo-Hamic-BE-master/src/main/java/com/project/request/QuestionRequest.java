package com.project.request;

import com.project.enums.QuestionType;
import lombok.Data;

import java.util.List;

@Data
public class QuestionRequest {
    private Long id;
    //private String title;
    private String content;
    private QuestionType type;
    private Integer maxPoint;
    private Integer level;
    private Long examId;
    private Long categoryId;
    private String answerWithTextsResult;
    List<AnswerRequest> answers;
    List<MediaRequest> images;
}
