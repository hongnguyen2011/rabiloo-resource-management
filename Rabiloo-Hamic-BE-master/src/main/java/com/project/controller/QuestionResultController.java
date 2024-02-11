package com.project.controller;

import com.project.service.QuestionResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QuestionResultController {
    @Autowired
    private QuestionResultService questionResultService;

    /*@PostMapping("/user/question-result-answer")
    public QuestionResultResponse answerQuestion(@RequestBody QuestionResultRequest req){
        return questionResultService.create(req);
    }*/


}
