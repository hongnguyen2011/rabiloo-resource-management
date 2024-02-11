package com.project.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "`notification`")
public class NotificationEntity extends BaseEntity{
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;
}
