package com.project.response;

import com.project.dto.ExamResultDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ExamResultResponse extends BaseResponse<ExamResultDto>{
    private Long total;
}
