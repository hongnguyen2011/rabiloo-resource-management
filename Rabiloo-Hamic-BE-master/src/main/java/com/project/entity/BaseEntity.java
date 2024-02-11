package com.project.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(updatable = false)
	@CreatedDate
	private Date createdDate;

	@Column
	@LastModifiedDate
	private Date modifiedDate;

	@Column(name = "created_by",updatable = false)
	@CreatedBy
	private Long createdBy;

	@Column(name = "modified_by")
	@LastModifiedBy
	private Long modifiedBy;

	private Boolean deleted = Boolean.FALSE;
}
