package com.project.response;

import com.project.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponse extends BaseResponse<UserDto>{
    private Long total;
}
