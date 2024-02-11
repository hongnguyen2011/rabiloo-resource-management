package com.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto extends BaseDto {
	private String userName;
	private String lastName;
	private String firstName;
	private Long birthDay;
	private String gender;
	private String city;
	private List<RoleDto> roles;
}
