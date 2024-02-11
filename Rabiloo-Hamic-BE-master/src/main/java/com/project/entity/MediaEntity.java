package com.project.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "`media`")
@Getter
@Setter
@Where(clause = "deleted = false")
public class MediaEntity extends BaseEntity{
    private String path;
    @Column
    private String type; // image or video

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuestionEntity question;
}
