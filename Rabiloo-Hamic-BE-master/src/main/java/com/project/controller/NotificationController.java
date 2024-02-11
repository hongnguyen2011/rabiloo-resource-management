package com.project.controller;

import com.project.request.NotificationRequest;
import com.project.response.NotificationResponse;
import com.project.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private NotificationService service;

    @GetMapping("/public/notify-all")
    public NotificationResponse getAll(){
        return service.findAll();
    }

    @PostMapping("/admin/notify-create")
    public NotificationResponse create(@RequestBody NotificationRequest request) {
        return service.create(request);
    }

    @PutMapping("/admin/notify-update")
    public NotificationResponse update(@Valid @RequestBody NotificationRequest request){
        return service.update(request);
    }
    @DeleteMapping("/admin/notify-delete")
    public NotificationResponse delete(@RequestParam Long id){
        return service.delete(id);
    }
}
