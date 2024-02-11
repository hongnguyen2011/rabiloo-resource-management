package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionResultDto extends BaseDto {
    private String content;
    private Integer point;
}
