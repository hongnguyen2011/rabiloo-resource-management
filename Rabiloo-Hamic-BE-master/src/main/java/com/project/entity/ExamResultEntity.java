package com.project.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "`exam_result`")
@Getter
@Setter
@NoArgsConstructor
public class ExamResultEntity extends  BaseEntity{

    @Column(unique = true)
    private String uuid;
    @Column
    private Integer points;
    @Column(name = "start_time")
    private Date start;
    @Column(name = "end_time")
    private Date end;

    @Column(name = "submitted")
    private boolean submitted;

    @ManyToOne
    @JoinColumn(name = "exam_id",nullable = false)
    private ExamEntity exam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany
    private List<QuestionResultEntity> questionResults;

    public ExamResultEntity(Long id, Integer points, Date start, Date end, ExamEntity exam){
        this.setId(id);
        this.points = points;
        this.start = start;
        this.end = end;
        this.exam = exam;
    }
}
