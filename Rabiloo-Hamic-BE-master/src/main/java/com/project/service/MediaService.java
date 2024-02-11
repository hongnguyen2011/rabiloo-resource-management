package com.project.service;

import com.project.dto.MediaDto;
import com.project.entity.MediaEntity;
import com.project.request.MediaRequest;
import com.project.response.MediaResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MediaService extends BaseService<MediaResponse,MediaRequest> {
    MediaResponse createNew(MultipartFile file);

    List<MediaEntity> findByQuestionId(Long questionId);

    List<MediaDto> saveAll(List<MediaEntity> requests);

    void deleteAll(List<MediaEntity> medias);
}
