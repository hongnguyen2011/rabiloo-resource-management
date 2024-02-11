package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseDto {
	private Long id;
	private Long createdDate;
	private Long modifiedDate;
	private String createdBy;
	private String modifiedBy;
}
