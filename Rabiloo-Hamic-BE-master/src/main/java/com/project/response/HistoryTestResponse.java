package com.project.response;

import com.project.dto.HistoryTestDto;
import lombok.Data;

@Data
public class HistoryTestResponse extends BaseResponse<HistoryTestDto>{
    private Long total;
    private String commonTitleExam;
}
