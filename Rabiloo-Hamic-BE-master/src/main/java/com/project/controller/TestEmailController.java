package com.project.controller;

import com.project.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestEmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("api/public/test-send-mail")
    public String sendEmail() {
        emailService.sendSimpleMessage("luongvy4898@gmail.com", "subject", "test content");
        return "success";
    }
}
