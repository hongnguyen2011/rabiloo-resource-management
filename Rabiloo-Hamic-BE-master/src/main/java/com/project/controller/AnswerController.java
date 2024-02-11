package com.project.controller;

import com.project.request.AnswerRequest;
import com.project.response.AnswerResponse;
import com.project.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api")
public class AnswerController {
    @Autowired
    private AnswerService answerService;

    /*@GetMapping("/{id}")
    public AnswerResponse getAnswer(@PathVariable Long id) {
        return  answerService.findOne(id);
    }*/

    @PostMapping("/admin/answer/answer-create/")
    public AnswerResponse createAnswer(@RequestBody AnswerRequest req) {
        return answerService.create(req);
    }

    @PutMapping("/admin/answer/answer-edit")
    public AnswerResponse editExam(@RequestBody AnswerRequest req){
        return answerService.update(req);
    }

    @DeleteMapping("/admin/answer/answer-delete")
    public AnswerResponse deleteAnswer(@PathVariable Long id) {
       return answerService.delete(id);
    }
}
