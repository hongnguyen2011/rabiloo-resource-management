package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExamResultDto extends BaseDto {
    private Integer points;
    private Long start;
    private Long end;
    private Long examId;
}
