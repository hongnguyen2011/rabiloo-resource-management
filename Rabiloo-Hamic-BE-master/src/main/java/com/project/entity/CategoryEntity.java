package com.project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "`categories`")
@Getter
@Setter
public class CategoryEntity extends BaseEntity{
    @Column
    private String name;
    @Column
    private String code;

    @OneToMany(mappedBy = "category")
    private List<QuestionEntity> questions;
}
