package com.project.controller;

import com.project.response.MediaResponse;
import com.project.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class MediaController {

    //TODO config and add api create, update, delete media
    @Autowired
    private MediaService service;

    @PostMapping(value = "/public/image-upload", produces = MediaType.APPLICATION_JSON_VALUE)
    public MediaResponse handleFileUpload(@RequestParam("file") MultipartFile file) {

        return service.createNew(file);
    }
}
