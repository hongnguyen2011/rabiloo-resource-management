package com.project.service.impl;

import com.project.config.UserAuth;
import com.project.dto.UserDto;
import com.project.entity.UserEntity;
import com.project.enums.RoleType;
import com.project.repository.UserRepository;
import com.project.request.ChangePasswordRequest;
import com.project.request.UserRequest;
import com.project.response.UserResponse;
import com.project.service.UserService;
import com.project.service.user.ForgotPasswordService;
import com.project.service.user.RegisterUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserAuth userAuth;

    @Autowired
    private UserRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RegisterUserService registerUserService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @Override
    public UserResponse findAll() {
        ;
        List<UserEntity> entities = repository.findAll();

        UserResponse response = new UserResponse();
        if (entities.isEmpty()) {
            response.setMessage("answers is null");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            List<UserDto> dtos = new ArrayList<>();
            entities.forEach(e -> dtos.add(mapper.map(e, UserDto.class)));

            response.setDtos(dtos);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }


        return response;
    }

    @Override
    public UserResponse findOne(Long id) {
        Optional<UserEntity> questionEntityOptional = repository.findById(id);

        UserResponse response = new UserResponse();

        if (!questionEntityOptional.isPresent()) {
            response.setMessage("answer not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            UserDto dto = mapper.map(questionEntityOptional.get(), UserDto.class);
            response.setDto(dto);
            response.setMessage("ok");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public UserResponse create(UserRequest req) {
        UserResponse response = new UserResponse();

        // check register code
        boolean isNotRequestedRegister = !registerUserService.checkRegisterCode(req.getUserName(), req.getRegisterCode());
        if(isNotRequestedRegister) {
            response.setMessage("Not request register yet");
            response.setStatusCode(HttpStatus.BAD_REQUEST);

            return response;
        }

        UserEntity user;

        user = repository.findByUserName(req.getUserName());

        if (user != null) {
            response.setMessage("User name is exits");
            response.setStatusCode(HttpStatus.BAD_REQUEST);
        }

        user = mapper.map(req, UserEntity.class);

        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(RoleType.ROLE_USER);

        UserDto dto = mapper.map(repository.save(user), UserDto.class);

        response.setDto(dto);
        response.setMessage("ok");
        response.setStatusCode(HttpStatus.OK);

        return response;
    }

    @Override
    public UserResponse update(UserRequest req) {
		/*UserEntity user;
		user = repository.findByUserName(req.getUserName());
		if (user == null){
			return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
		}
		user = mapper.map(req,UserEntity.class);
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		UserDto dto = mapper.map(repository.save(user),UserDto.class);
		dto.setPassword(req.getPassword());
		return new ResponseEntity<>(dto,HttpStatus.OK);*/
        return null;
    }


    @Override
    public UserResponse delete(Long id) {
        Optional<UserEntity> optional = repository.findById(id);

        UserResponse response = new UserResponse();
        if (!optional.isPresent()) {
            response.setMessage("Answer is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            UserEntity entity = optional.get();
            entity.setDeleted(true);
            entity.setActive(false);
            UserDto dto = mapper.map(repository.save(entity), UserDto.class);

            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public Optional<UserEntity> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public UserEntity findByUserName(String userName) {
        return repository.findByUserName(userName);
    }

    @Override
    public UserResponse updateUserInfo(UserRequest request) {

        UserResponse response = new UserResponse();
        if (request.getId() == null) {
            response.setMessage("User is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
            return response;
        }

        Optional<UserEntity> userOptional = repository.findById(request.getId());

        if (!userOptional.isPresent()) {
            response.setMessage("User is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
            return response;
        }

        UserEntity user = userOptional.get();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setGender(request.getGender());
        user.setBirthDay(new Date(request.getBirthDay()));
        user.setCity(request.getCity());

        response.setDto(mapper.map(repository.save(user), UserDto.class));
        response.setMessage("OK");
        response.setStatusCode(HttpStatus.OK);
        return response;
    }

    @Override
    public UserResponse getCurrent() {

        UserEntity user = userAuth.getCurrent();

        UserResponse response = new UserResponse();
        if (user != null) {
            response.setDto(mapper.map(user, UserDto.class));
            response.setStatusCode(HttpStatus.OK);
            response.setMessage("OK");
        } else {
            response.setMessage("Not authentication");
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
        }
        return response;
    }

    @Override
    public UserResponse changePassword(ChangePasswordRequest request) {
        UserEntity user = userAuth.getCurrent();

        UserResponse response = new UserResponse();

        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            response.setMessage(" old password not match in db");
            response.setStatusCode(HttpStatus.BAD_REQUEST);
            return response;
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        try{
            repository.save(user);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }catch (Exception e){
            response.setMessage(e.getMessage());
            response.setStatusCode(HttpStatus.BAD_REQUEST);
        }

       return response;
    }

    @Override
    public UserResponse getAllUserNoneDeleted(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("modifiedDate").descending());
        Page<UserEntity> curPage = repository.findByDeletedFalseAndRoleEquals(pageable,RoleType.ROLE_USER);

        List<UserEntity> userEntities = curPage.getContent();
        var userDtos = userEntities.stream()
                                    .map(u -> toDto(u))
                                    .collect(Collectors.toList());

        UserResponse response = new UserResponse();
        response.setTotal(curPage.getTotalElements());
        response.setDtos(userDtos);
        response.setMessage("ok");
        response.setStatusCode(HttpStatus.OK);

        return response;
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return repository.findByDeletedFalse();
    }

    @Override
    public UserResponse deactivate(Long id) {
        var optional = repository.findById(id);

        UserResponse response = new UserResponse();
        if(optional.isEmpty()){
            response.setMessage("User not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        }

        var user = optional.get();

        if(user.getRole().equals(RoleType.ROLE_ADMIN)){
            response.setMessage("User is Admin");
            response.setStatusCode(HttpStatus.BAD_REQUEST);
        }

        user.setActive(false);
        user.setDeleted(true);

        repository.save(user);

        response.setMessage("OK");
        response.setStatusCode(HttpStatus.OK);
        return response;
    }

    UserDto toDto(UserEntity entity) {
        UserDto dto = new UserDto();

        dto.setId(entity.getId());
        if(entity.getCreatedDate()!=null){
            dto.setCreatedDate(entity.getCreatedDate().getTime());
        }

        if(entity.getModifiedDate()!=null){
            dto.setModifiedDate(entity.getModifiedDate().getTime());
        }
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setGender(entity.getGender());
        dto.setCity(entity.getCity());
        if(entity.getBirthDay() != null){
            dto.setBirthDay(entity.getBirthDay().getTime());
        }
        dto.setUserName(entity.getUserName());

        return dto;
    }

    @Override
    public UserResponse resetPassword(String email, String token, String newPassword) {
        UserResponse res = new UserResponse();
        UserEntity user = repository.findByUserName(email);
        if(user == null) {
            res.setStatusCode(HttpStatus.NOT_FOUND);
            res.setMessage("email not registered or deactivated");

            return res;
        }

        if(!forgotPasswordService.check(email, token)) {
            res.setStatusCode(HttpStatus.NOT_FOUND);
            res.setMessage("token is invalid");

            return res;
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);
        res.setStatusCode(HttpStatus.OK);

        return res;
    }

    @Override
    public boolean isEmailRegistered(String email) {
        return repository.findByUserName(email) != null;
    }
}
