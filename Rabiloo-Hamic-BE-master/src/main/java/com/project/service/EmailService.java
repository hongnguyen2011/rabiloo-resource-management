package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@hamic.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public void senMimeMessageMail(String to, String subject, String text) {
        try {
            MimeMessage mail = emailSender.createMimeMessage();
            mail.setSubject(subject, "UTF-8");

            MimeMessageHelper helper = new MimeMessageHelper(mail, true, "UTF-8");
            helper.setFrom("rabiloo.hamic.team7@gmail.com");
            helper.setTo(to);
            helper.setText(text, true);

            new Thread(() -> emailSender.send(mail)).start();
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
