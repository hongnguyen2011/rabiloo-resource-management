package com.project.service.impl;

import com.project.dto.MediaDto;
import com.project.entity.MediaEntity;
import com.project.repository.MediaRepository;
import com.project.request.MediaRequest;
import com.project.response.MediaResponse;
import com.project.service.MediaService;
import com.project.service.QuestionService;
import com.project.service.StorageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MediaServiceImpl implements MediaService {

    @Autowired
    private MediaRepository repository;

    private QuestionService questionService;

    private StorageService storageService;

    @Autowired
    public MediaServiceImpl(StorageService storageService,
                            @Lazy QuestionService questionService) {
        this.storageService = storageService;
        this.questionService = questionService;
    }

    @Autowired
    private ModelMapper mapper;

    @Override
    public MediaResponse findAll() {
		/*List<MediaEntity> entities = repository.findAll();
		if(entities.isEmpty()){
			return new ResponseEntity<>("there image/video is null", HttpStatus.NOT_FOUND);
		}
		List<MediaDto> dtos = new ArrayList<>();
		entities.forEach(e -> dtos.add(mapper.map(e, MediaDto.class)));

		return new ResponseEntity<>(dtos,HttpStatus.OK);*/

        return null;
    }

    @Override
    public MediaResponse findOne(Long id) {

		/*Optional<MediaEntity> mediaEntityOptional = repository.findById(id);
		if(!mediaEntityOptional.isPresent()){
			return new ResponseEntity<>("Not found",HttpStatus.NOT_FOUND);
		}

		MediaDto dto = mapper.map(mediaEntityOptional.get(),MediaDto.class);
		return new ResponseEntity<>(dto,HttpStatus.OK);*/

        return null;
    }

    @Override
    public MediaResponse create(MediaRequest req) {
        return save(req);
    }

    @Override
    public MediaResponse update(MediaRequest req) {
		/*Optional<MediaEntity> mediaEntityOptional = repository.findById(req.getId());
		if(!mediaEntityOptional.isPresent())
			return new ResponseEntity<>("media not found",HttpStatus.NOT_FOUND);

		return save(req);*/

        return null;
    }

    private MediaResponse save(MediaRequest req) {
		/*Optional<QuestionEntity> questionEntityOptional = questionService.findById(req.getQuestionId());
		if(!questionEntityOptional.isPresent()){
			return new ResponseEntity<>("Question not found",HttpStatus.BAD_REQUEST);
		}

		MediaEntity entity = mapper.map(req,MediaEntity.class);
		entity.setQuestion(questionEntityOptional.get());

		MediaDto dto = mapper.map(repository.save(entity),MediaDto.class);

		return new ResponseEntity<>(dto,HttpStatus.OK);*/

        return null;
    }


    @Override
    public MediaResponse delete(Long id) {
        MediaEntity entity = repository.findById(id).get();
        MediaResponse response = new MediaResponse();
        if (entity == null) {
            response.setMessage("NOT FOUND");
            response.setStatusCode(HttpStatus.BAD_REQUEST);
        } else {
            entity.setDeleted(true);
            repository.save(entity);

            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        }

        return response;
    }

    public MediaResponse createNew(MultipartFile file) {
        MediaResponse response = new MediaResponse();
        try {
            UUID uuid = UUID.randomUUID();
            storageService.store(file, uuid);
            MediaDto dto = new MediaDto();
            dto.setPath("/upload/" + uuid + "-" + file.getOriginalFilename());
            response.setDto(dto);
            response.setMessage("OK");
            response.setStatusCode(HttpStatus.OK);
        } catch (Exception e) {
            response.setMessage("Error + " + e.getMessage());
            response.setStatusCode(HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    @Override
    public List<MediaEntity> findByQuestionId(Long questionId) {
        return repository.findByQuestion_IdAndDeletedFalse(questionId);
    }

    @Override
    public List<MediaDto> saveAll(List<MediaEntity> requests) {
        List<MediaEntity> medias = repository.saveAll(requests);

        return medias.stream().map(m -> mapper.map(m, MediaDto.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteAll(List<MediaEntity> medias) {
        medias.forEach(m -> m.setDeleted(true));
        try {
            repository.saveAll(medias);
        } catch (Exception e) {
            throw e;
        }
    }

}
