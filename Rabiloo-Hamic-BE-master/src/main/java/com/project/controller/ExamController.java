package com.project.controller;

import com.project.request.ExamFilterRequest;
import com.project.request.ExamRequest;
import com.project.response.ExamResponse;
import com.project.response.UserResponse;
import com.project.service.ExamService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ExamController {
    @Autowired
    private ExamService service;

    @GetMapping("/public/exam")
    public ExamResponse getPublicExam(@RequestParam Long id) {
        return service.findPublicExam(id);
    }

    @GetMapping("/public/exam-all")
    public ExamResponse getPublicExams() {
        return service.findPublicExams();
    }

    @GetMapping("/user/exam")
    public ExamResponse getOne(@RequestParam Long id) {
        return service.findOne(id);
    }

    @GetMapping("/user/exam-all")
    public ExamResponse getAll() {
        return service.findAll();
    }

    @GetMapping("/admin/exam")
    public ExamResponse getOneByAdmin(@RequestParam Long id) {
        return service.findOne(id);
    }

    @GetMapping("/admin/exam-all")
    public ExamResponse getAllByAdmin() {
        return service.findAll();
    }

    @PostMapping("/admin/exam/exam-create")
    public ExamResponse createExam(@RequestBody ExamRequest req) {
        return service.create(req);
    }

    @PutMapping("/admin/exam/exam-edit")
    public ExamResponse updateExam(@RequestBody ExamRequest req) {
        return service.update(req);
    }

    @DeleteMapping("/admin/exam/exam-delete")
    public ExamResponse deleteExam(@RequestParam Long id) {
        return service.delete(id);
    }

    //TODO add filter exam api
    // filter by code, title, start, end ..v..v...
    @PostMapping("/public/exam/exam-filter")
    public ExamResponse getExamsByFilterParam(@RequestBody ExamFilterRequest request) {
        return service.findExamsByParamNative(request);
    }

    @GetMapping("admin/get-exam-excel-file")
    public ResponseEntity<Resource> getExamExcelFile(Long examId) {
        InputStreamResource file = new InputStreamResource(service.genExamExcelFile(examId));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=exam.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel; charset=UTF-8"))
                .body(file);
    }

    @PostMapping("admin/import-excel")
    public UserResponse importExamFromExcel(@RequestParam MultipartFile file) throws IOException {
        service.importExamFromExcelFile(file);

        var res = new UserResponse();
        res.setStatusCode(HttpStatus.OK);

        return res;
    }
}
