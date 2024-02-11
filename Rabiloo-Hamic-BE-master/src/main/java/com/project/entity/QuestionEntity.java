package com.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.enums.QuestionType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "`questions`")
@Getter
@Setter
@Where(clause = "deleted = false")
@org.hibernate.annotations.Cache(
		usage = CacheConcurrencyStrategy.READ_WRITE
)
public class QuestionEntity extends BaseEntity{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/*@Column
	private String title;*/
	@Column(columnDefinition = "TEXT")
	private String content;
	@Column
	@Enumerated(EnumType.STRING)
	private QuestionType type;
	@Column
	private Integer level;
	@Column
	private Integer maxPoint;

	@OneToMany(mappedBy = "question",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<AnswerEntity> answers;

	@OneToMany(mappedBy = "question",cascade = CascadeType.ALL)
	private List<MediaEntity> images;

	@OneToMany(mappedBy = "question")
	private List<QuestionResultEntity> questionResult;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "exam_id")
	@JsonIgnore
	private ExamEntity exam;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private CategoryEntity category;

	//private String answerWithTextsResult; // Lien Xo|Nga|Lien Bang Nga

	//private boolean requireAdminGiveGrade; // default values false
}
