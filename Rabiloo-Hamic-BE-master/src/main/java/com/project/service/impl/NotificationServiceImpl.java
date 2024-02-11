package com.project.service.impl;

import com.project.dto.AnswerDto;
import com.project.dto.NotificationDto;
import com.project.entity.NotificationEntity;
import com.project.entity.UserEntity;
import com.project.repository.NotificationRepository;
import com.project.request.NotificationRequest;
import com.project.response.NotificationResponse;
import com.project.service.EmailService;
import com.project.service.NotificationService;
import com.project.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Override
    public NotificationResponse findAll() {
        List<NotificationEntity> entities = repository.findByDeletedFalse();
        NotificationResponse response = new NotificationResponse();
        if (entities.isEmpty()) {
            response.setMessage("answers is null");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            List<NotificationDto> dtos = new ArrayList<>();
            entities.forEach(e -> dtos.add(mapper.map(e, NotificationDto.class)));
            Collections.reverse(dtos);
            response.setDtos(dtos);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    @Override
    public NotificationResponse findOne(Long id) {
        NotificationEntity entity = repository.findByIdAndDeletedFalse(id);

        NotificationResponse response = new NotificationResponse();
        if (entity == null) {
            response.setMessage("answer not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            NotificationDto dto = mapper.map(entity, NotificationDto.class);
            response.setDto(dto);
            response.setMessage("ok");
            response.setStatusCode(HttpStatus.OK);
        }
        return response;
    }

    @Override
    public NotificationResponse create(NotificationRequest req) {
        NotificationResponse response = new NotificationResponse();
        if (req == null) {
            response.setMessage("notification request is null");
            response.setStatusCode(HttpStatus.BAD_REQUEST);
        } else {
            NotificationEntity notification = mapper.map(req, NotificationEntity.class);

            NotificationDto dto = mapper.map(repository.save(notification), NotificationDto.class);
            response.setDto(dto);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);

            // send mail to all users
            List<UserEntity> users = userService.getAllUsers();
            new Thread(() -> {
                users.parallelStream().forEach(user -> {
                    sendNotiMailToUser(user.getUserName(), notification);
                });
            }).start();
        }

        return response;
    }

    private void sendNotiMailToUser(String email, NotificationEntity noti) {
        emailService.senMimeMessageMail(email, noti.getTitle(), noti.getDescription());
    }

    @Override
    public NotificationResponse update(NotificationRequest req) {
        var oldNotify = repository.findByIdAndDeletedFalse(req.getId());

        oldNotify.setTitle(req.getTitle());
        oldNotify.setDescription(req.getDescription());

        var newNotify = repository.save(oldNotify);

        NotificationResponse response = new NotificationResponse();
        response.setDto(mapper.map(newNotify, NotificationDto.class));
        response.setMessage("ok");
        response.setStatusCode(HttpStatus.OK);

        return response;
    }

    @Override
    public NotificationResponse delete(Long id) {
        Optional<NotificationEntity> optional = repository.findById(id);

        NotificationResponse response = new NotificationResponse();
        if (!optional.isPresent()) {
            response.setMessage("Answer is not found");
            response.setStatusCode(HttpStatus.NOT_FOUND);
        } else {
            NotificationEntity entity = optional.get();
            entity.setDeleted(true);
            AnswerDto dto = mapper.map(repository.save(entity), AnswerDto.class);

            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }
}
