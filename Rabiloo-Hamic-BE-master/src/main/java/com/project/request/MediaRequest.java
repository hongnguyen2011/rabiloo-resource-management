package com.project.request;

import lombok.Data;

@Data
public class MediaRequest {
    private String path;
    private String type; // image or video
}
