package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MediaDto extends BaseDto {
    private String path;
    private String type; // image or video
}
