package com.project.dto;

import lombok.Data;

@Data
public class HistoryTestDto extends BaseDto{
    private UserDto user;
    private ExamResultDto examResult;
    private ExamDto exam;
}
