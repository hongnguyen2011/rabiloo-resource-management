package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDto extends BaseDto{
    private String title;
    private String description;
}
