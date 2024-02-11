package com.project.controller;

import com.project.response.HistoryTestResponse;
import com.project.service.HistoryTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HistoryTestController {

    @Autowired
    private HistoryTestService service;

    @GetMapping("/admin/exams")
    public HistoryTestResponse getAll(@RequestParam(defaultValue = "1") Integer page,
                                      @RequestParam(defaultValue = "5") Integer size){
        return service.findAll(page,size);
    }

    @GetMapping("/user/exams-history")
    public HistoryTestResponse getHistoryTestsUser(@RequestParam(defaultValue = "1") Integer page,
                                              @RequestParam(defaultValue = "5") Integer size){
        return service.findAllByUser(page,size);
    }

    @GetMapping("/admin/exam-history-users")
    public HistoryTestResponse getHistoryTestUsers(@RequestParam Long examId,
                                                   @RequestParam(defaultValue = "1") Integer page,
                                                   @RequestParam(defaultValue = "5") Integer size){
        return service.findAllByExamId(examId,page,size);
    }
}
