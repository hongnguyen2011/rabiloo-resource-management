package com.project.service.user;

import com.project.entity.ForgotPasswordToken;
import com.project.entity.UserEntity;
import com.project.repository.ForgotPasswordTokenRepository;
import com.project.repository.UserRepository;
import com.project.response.UserResponse;
import com.project.service.EmailService;
import com.project.utils.RandomUtilsHamic;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;

@Slf4j
@Service
public class ForgotPasswordService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ForgotPasswordTokenRepository repository;

    @Autowired
    private EmailService emailService;

    @Value("${fe-link}")
    private String feLink;

    public String genForgotPasswordToken(String email, String token) {
        return "<p>Bạn đang gửi yêu cầu quên mật khẩu cho  tài khoản tại webcontest-hamic-team7.</p>" +
                "<p>Hãy nhấp vào <a href=\"" +
                feLink + "/reset-password?email=" + email + "&forgotPasswordToken=" + token +
                "\">Link đặt lại mật khẩu!</a> này để tiếp tục</p>\n" +
                "<p>Nếu không phải bạn xin vui lòng bỏ qua email này</p>";
    }

    public UserResponse requestForgotPassword(String email) {
        UserResponse res = new UserResponse();
        UserEntity user = userRepository.findByUserName(email);
        if(user == null) {
            res.setStatusCode(HttpStatus.NOT_FOUND);

            return res;
        }

        String token = RandomUtilsHamic.genRandomStringCode();
        new Thread(() -> emailService.senMimeMessageMail(
                email,
                "HAMIC WEBCONTEST - FORGOT PASSWORD",
                genForgotPasswordToken(email, token)
        )).start();

        ForgotPasswordToken forgotPasswordToken = new ForgotPasswordToken();
        forgotPasswordToken.setEmail(email);
        forgotPasswordToken.setChangePasswordToken(token);
        forgotPasswordToken.setRequestTime(new Date());
        repository.save(forgotPasswordToken);

        res.setStatusCode(HttpStatus.OK);
        return res;
    }

    public boolean check(String email, String token) {
        return repository.findByEmailAndChangePasswordToken(email, token) != null;
    }
}
