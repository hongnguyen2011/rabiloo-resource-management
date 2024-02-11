package com.project.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class QuestionDto extends BaseDto {
    private String title;
    private String content;
    private Integer level;
    private String type;
    private Integer maxPoint;
    private Date timeAnswer;
    private Long examId;
    private List<AnswerDto> answers;
    private List<MediaDto> images;
}
