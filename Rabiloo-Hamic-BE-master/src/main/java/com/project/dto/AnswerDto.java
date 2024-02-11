package com.project.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AnswerDto extends BaseDto {
    @NotBlank
    private String content;
    private int isResult;
    private Long questionId;
}
