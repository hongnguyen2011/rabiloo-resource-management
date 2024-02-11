package com.project.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class NotificationRequest {
    @NotNull
    private Long id;
    private String title;
    private String description;
}
