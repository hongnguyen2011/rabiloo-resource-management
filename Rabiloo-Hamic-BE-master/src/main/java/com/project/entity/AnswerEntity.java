package com.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "`answers`")
@Getter
@Setter
@Where(clause = "deleted = false")
public class AnswerEntity extends BaseEntity{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Column(columnDefinition = "TEXT")
	private String content;

	@Column
	private int isResult;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "question_id")
	@JsonIgnore
	private QuestionEntity question;

}
