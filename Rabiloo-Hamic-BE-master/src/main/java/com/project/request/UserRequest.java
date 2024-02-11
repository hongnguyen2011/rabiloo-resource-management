package com.project.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UserRequest {
    private Long id;
    @NotNull
    @NotBlank
    private String userName;
    @NotNull
    @NotBlank
    private String password;
    private String firstName;
    private String lastName;
    private Long birthDay;
    private String gender;
    private String city;
    private String registerCode;
}
