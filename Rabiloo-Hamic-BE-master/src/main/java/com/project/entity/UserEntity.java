package com.project.entity;

import com.project.enums.RoleType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "`users`")
@Getter
@Setter
public class UserEntity extends BaseEntity{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "user_name",nullable = false, unique = true)
	private String userName;
	
	@Column(nullable = false)
	private String password;
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;

	@Column(name = "birth_day")
	private Date birthDay;

	private String gender;

	private String city;
	
	@Column(name = "active")
	private boolean active = Boolean.TRUE;
	@Enumerated(EnumType.STRING)
    private RoleType role;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_exam", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "exam_id"))
	private List<ExamEntity> exams;

	@OneToMany(mappedBy = "user")
	private List<ExamResultEntity> examResults;

}
