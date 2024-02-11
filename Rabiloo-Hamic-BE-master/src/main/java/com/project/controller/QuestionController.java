package com.project.controller;

import com.project.request.QuestionRequest;
import com.project.response.QuestionResponse;
import com.project.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @PostMapping("/admin/question/question-create/")
    public QuestionResponse createQuestion(@RequestBody QuestionRequest req) {
        return  questionService.create(req);
    }

    @PutMapping("/admin/question/question-edit")
    public QuestionResponse editQuestion(@RequestBody QuestionRequest req){
        return questionService.update(req);
    }

    /* REVIEW: remove path variable field: id */
    @DeleteMapping("/admin/question/question-delete")
    public QuestionResponse deleteQuestion(@RequestParam Long id) {

        return questionService.delete(id);
    }

    // TODO add api: user answer the question
}
